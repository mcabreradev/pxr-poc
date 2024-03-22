/* eslint-disable simple-import-sort/imports */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import 'react-datepicker/dist/react-datepicker.css';

import { useSearchParamOrStore } from '@/hooks';
import { getFormatedMontsDays } from '@/lib/time';

import { Button, Typography } from '@/components';

export default function MobileDatepickerComponent() {
  const { t } = useTranslation();
  const { getAdults, getChildrens, getInfants } = useSearchParamOrStore();
  const { checkinDate, checkoutDate } = useSearchParamOrStore();

  const [startDate] = useState<Date>(checkinDate);
  const [endDate] = useState<Date>(checkoutDate);

  const handleClick = useCallback(() => {
    const element = document.getElementById('rooms');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }, []);

  const total = getAdults() + getChildrens() + getInfants();

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
