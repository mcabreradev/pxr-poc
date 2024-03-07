/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import 'react-datepicker/dist/react-datepicker.css';

import { getFormatedMontsDays } from '@/lib/time';

import Button from '@/components/button';
import Typography from '@/components/typography';

import useReservationQueryStore from '@/store/use-reservation.store';

import {
  CHECKIN_DEFAULT_FUTURE_DAYS,
  CHECKOUT_DEFAULT_FUTURE_DAYS,
  TOTAL_ADULTS_DEFAULT,
} from '@/constants';
import useGlobalStore from '@/store/use-global.store';

export default function HeaderDatepickerComponent() {
  const {
    reservation: { adults, childrens, infants },
  } = useReservationQueryStore();
  const { openDatepickerDrawer } = useGlobalStore();
  const { t } = useTranslation();

  const total =
    (adults ?? TOTAL_ADULTS_DEFAULT) + (childrens ?? 0) + (infants ?? 0);

  const today = dayjs();
  const checkinDefault = today.add(CHECKIN_DEFAULT_FUTURE_DAYS, 'day').toDate();

  const checkoutDefault = today
    .add(CHECKOUT_DEFAULT_FUTURE_DAYS, 'day')
    .toDate();

  return (
    <div
      className='relative flex w-full flex-row items-center justify-around bg-white'
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
