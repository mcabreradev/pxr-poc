/* eslint-disable simple-import-sort/imports */
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Typography from '@/components/typography';
import DatepickerDesktop from './datepicker/desktop-datepicker';
import Dropdown from './dropdown';

import { PROPERTY_CURRENCY } from '@/constants';
import { formatCurrency } from '@/lib/number';
import { useSelectedRoomtypeStore } from '@/store';
import { Ratesplan, SelectedRoomtype } from '@/types';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
}

const Container = tw.div`
sticky bottom-0 top-5 ml-5 mt-5 box-border flex h-min w-full flex-col rounded border-[1px] border-solid border-neutral-50 bg-white p-5 drop-shadow-lg`;

export default function GuestFormComponent({ className }: Props) {
  const { t } = useTranslation();
  const [room, setRoom] = useState<SelectedRoomtype>();
  const [ratesPlan, setRatesPlan] = useState<Ratesplan>();

  useEffect(() => {
    /**
     * Subscribes to the selected room type store and updates the room and rates plan state.
     * @returns {void}
     */
    const unsub = useSelectedRoomtypeStore.subscribe(({ selectedRoom }) => {
      setRoom(selectedRoom);
      setRatesPlan(selectedRoom?.ratesPlan);
    });
    return unsub;
  }, []);

  return (
    <Container className={cn(className)}>
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
            ratesPlan[0]?.rate ?? NaN,
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
    </Container>
  );
}
