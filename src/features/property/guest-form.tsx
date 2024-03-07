/* eslint-disable simple-import-sort/imports */
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Typography from '@/components/typography';
import DatepickerDesktop from './datepicker/desktop-datepicker';
import Dropdown from './dropdown';

import { PROPERTY_CURRENCY } from '@/constants';
import { useIntersectionObserver, useSubscribeToStore } from '@/hooks';
import { formatCurrency } from '@/lib/number';
import { useGlobalStore, useSelectedRoomtypeStore } from '@/store';
import { Ratesplan, SelectedRoomtype } from '@/types';
import { useEffect, useState } from 'react';

export default function GuestFormComponent() {
  const { t } = useTranslation();
  const [room, setRoom] = useState<SelectedRoomtype>();
  const [ratesPlan, setRatesPlan] = useState<Ratesplan>();
  const [isIntersected, setIntersected] = useState<boolean | undefined>(false);
  const { setGuestFormIntersecting } = useGlobalStore();

  const { ref, entry } = useIntersectionObserver({
    threshold: 1,
    root: null,
    rootMargin: '160px',
  });

  useSubscribeToStore(useSelectedRoomtypeStore, ({ selectedRoom }) => {
    setRoom(selectedRoom);
    setRatesPlan(selectedRoom?.ratesPlan);
  });

  useSubscribeToStore(useGlobalStore, ({ gallery }) => {
    setIntersected(gallery?.isIntersecting);
  });

  useEffect(() => {
    if (entry && 'isIntersecting' in entry) {
      setGuestFormIntersecting(entry.isIntersecting);
    }
  }, [entry, setGuestFormIntersecting]);

  return (
    <div
      className={cn(
        'sticky bottom-0 top-28 ml-5 mt-5 box-border flex h-min w-full flex-col rounded border-[1px] border-solid border-neutral-50 bg-white p-5 drop-shadow-lg',
      )}
      ref={ref}
    >
      {isIntersected}
      <Typography variant='sm' weight='semibold' className='mb-4'>
        {`${t('checkin')} - ${t('checkout')}`}
      </Typography>

      <DatepickerDesktop />

      <Typography variant='sm' weight='semibold' className='my-4'>
        {t('info.guest')}
      </Typography>

      <Dropdown />

      <hr />
      {ratesPlan && (
        <Typography variant='sm' weight='semibold' className='mb-4'>
          Desde{' '}
          {`${formatCurrency(
            ratesPlan[0]?.amountBeforeTax ?? NaN, // change to rate or amountBeforeTax
            ratesPlan[0]?.currency ?? PROPERTY_CURRENCY,
          )}`}{' '}
          x noche
        </Typography>
      )}
      <Button
        type='link'
        href={`/room-type/${room?.id}`}
        scroll={true}
        className='mb-4 md:mb-0 md:w-full'
        disabled={!ratesPlan}
        withSearchParams={true}
      >
        {ratesPlan ? t('button.search') : t('button.choose-room')}
      </Button>
    </div>
  );
}
