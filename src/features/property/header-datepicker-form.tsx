/* eslint-disable simple-import-sort/imports */
import { useTranslation } from 'react-i18next';

import 'react-datepicker/dist/react-datepicker.css';

import { getFormatedMontsDays } from '@/lib/time';

import Button from '@/components/button';
import Typography from '@/components/typography';

import { useSearchParamOrStore } from '@/hooks';
import useGlobalStore from '@/store/use-global.store';
import { useState } from 'react';

export default function HeaderDatepickerComponent() {
  const { openDatepickerDrawer } = useGlobalStore();
  const { t } = useTranslation();

  const { getAdults, getChildrens, getInfants } = useSearchParamOrStore();
  const { checkinDate, checkoutDate } = useSearchParamOrStore();

  const [startDate] = useState<Date>(checkinDate);
  const [endDate] = useState<Date>(checkoutDate);

  const total = getAdults() + getChildrens() + getInfants();

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
