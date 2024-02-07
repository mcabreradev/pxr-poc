/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import 'react-datepicker/dist/react-datepicker.css';

import useSearchParamOrStore from '@/hooks/use-search-param-or-store';
import { formatDate, getFormatedMontsDays } from '@/lib/time';

import Button from '@/components/button';
import Typography from '@/components/typography';

import useReservationStore from '@/store/use-reservation-persist.store';

import {
  CHECKIN_DEFAULT_FUTURE_DAYS,
  CHECKOUT_DEFAULT_FUTURE_DAYS,
  TOTAL_ADULTS_DEFAULT,
} from '@/constants';
import useDrawerStore from '@/store/use-drawer.store';

export default function MobileDatepickerComponent() {
  const {
    reservation: { adults, childrens, infants },
  } = useReservationStore();
  const { openDatepickerDrawer } = useDrawerStore();
  const { getCheckin, getCheckout } = useSearchParamOrStore();
  const { t } = useTranslation();

  const total =
    (adults ?? TOTAL_ADULTS_DEFAULT) + (childrens ?? 0) + (infants ?? 0);

  const today = dayjs();
  const checkinDefault = today.add(CHECKIN_DEFAULT_FUTURE_DAYS, 'day').toDate();
  const checkin = formatDate(getCheckin());
  const [startDate, setStartDate] = useState<Date | null>(
    checkin ? new Date(checkin) : checkinDefault,
  );

  const checkoutDefault = today
    .add(CHECKOUT_DEFAULT_FUTURE_DAYS, 'day')
    .toDate();
  const checkout = formatDate(getCheckout());
  const [endDate, setEndDate] = useState<Date | null>(
    checkout ? new Date(checkout) : checkoutDefault,
  );

  return (
    <div
      className='relative flex h-full w-full flex-row items-center justify-around bg-white px-2 py-5'
      data-testid='test-element'
    >
      <div className='flex flex-col'>
        <Typography variant='sm' weight='semibold'>
          {t('since')} $100.00 x {t('night.singular')}
        </Typography>
        <Typography
          variant='sm'
          weight='normal'
          className='flex underline'
          onClick={openDatepickerDrawer}
        >
          {`${getFormatedMontsDays(
            checkinDefault,
            checkoutDefault,
          )} • ${total} ${t('person.plural')}`}
        </Typography>
      </div>
      <div>
        <Button type='button' slim={true}>
          {t('button.choose-room')}
        </Button>
      </div>
    </div>
  );
}
