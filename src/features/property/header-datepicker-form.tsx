/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import 'react-datepicker/dist/react-datepicker.css';

import { formatStringToDate, getFormatedMontsDays } from '@/lib/time';

import Button from '@/components/button';
import Typography from '@/components/typography';

import useReservationStore from '@/store/use-reservation.store';

import {
  CHECKIN_DEFAULT_FUTURE_DAYS,
  CHECKOUT_DEFAULT_FUTURE_DAYS,
  TOTAL_ADULTS_DEFAULT,
} from '@/constants';
import { useSearchParamOrStore } from '@/hooks';
import useGlobalStore from '@/store/use-global.store';
import { useState } from 'react';

export default function HeaderDatepickerComponent() {
  const {
    reservation: { adults, childrens, infants },
  } = useReservationStore();
  const { openDatepickerDrawer } = useGlobalStore();
  const { t } = useTranslation();
  const { getCheckin, getCheckout } = useSearchParamOrStore();

  const total =
    (adults ?? TOTAL_ADULTS_DEFAULT) + (childrens ?? 0) + (infants ?? 0);

  const today = dayjs();
  const checkinDefault = today.add(CHECKIN_DEFAULT_FUTURE_DAYS, 'day').toDate();
  const checkin = formatStringToDate(getCheckin());
  const [startDate] = useState<Date>(
    checkin ? new Date(checkin) : checkinDefault,
  );

  const checkoutDefault = today
    .add(CHECKOUT_DEFAULT_FUTURE_DAYS, 'day')
    .toDate();
  const checkout = formatStringToDate(getCheckout());
  const [endDate] = useState<Date>(
    checkout ? new Date(checkout) : checkoutDefault,
  );

  return (
    <div
      className='relative flex w-full flex-row items-center justify-around gap-3 bg-white'
      data-testid='test-element'
    >
      <div className='flex cursor-pointer flex-col'>
        <Typography variant='sm2' weight='semibold'>
          {t('since')} $100.00 x {t('night.singular')}
        </Typography>
        <Typography
          variant='sm2'
          weight='normal'
          className='flex underline'
          onClick={openDatepickerDrawer}
        >
          {`${getFormatedMontsDays(
            startDate,
            endDate,
          )} • ${total} ${t('person.plural')}`}
        </Typography>
      </div>
      <div>
        <Button type='button' slim={true} className='cursor-pointer'>
          {t('button.choose-room')}
        </Button>
      </div>
    </div>
  );
}
