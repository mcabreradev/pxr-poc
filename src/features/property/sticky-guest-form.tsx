/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import 'react-datepicker/dist/react-datepicker.css';

import { formatStringToDate, getFormatedMontsDays } from '@/lib/time';

import Button from '@/components/button';
import Typography from '@/components/typography';

import { useReservationQueryStore } from '@/store';

import {
  CHECKIN_DEFAULT_FUTURE_DAYS,
  CHECKOUT_DEFAULT_FUTURE_DAYS,
  TOTAL_ADULTS_DEFAULT,
} from '@/constants';
import { useSearchParamOrStore } from '@/hooks';
import { useCallback, useState } from 'react';

export default function MobileDatepickerComponent() {
  const {
    reservation: { adults, childrens, infants },
  } = useReservationQueryStore();

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

  const handleClick = useCallback(() => {
    const element = document.getElementById('rooms');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

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
          onClick={handleClick}
        >
          {`${getFormatedMontsDays(
            startDate,
            endDate,
          )} • ${total} ${t('person.plural')}`}
        </Typography>
      </div>
      <div>
        <Button type='button' slim={true} onClick={handleClick}>
          {t('button.choose-room')}
        </Button>
      </div>
    </div>
  );
}
