/* eslint-disable simple-import-sort/imports */
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Typography from '@/components/typography';
import DatepickerDesktop from './datepicker/desktop-datepicker';
import Dropdown from './dropdown';

import { formatCurrency, getRatesPerRoom } from '@/lib/number';
import useSelectedRoomtypeStore from '@/store/use-selected-roomtype.store';

interface Props {
  className?: string;
}

const Container = tw.div`
sticky bottom-0 top-5 ml-5 mt-5 box-border flex h-min w-full flex-col rounded border-[1px] border-solid border-neutral-50 bg-white p-5 drop-shadow-lg`;

export default function GuestFormComponent({ className }: Props) {
  const { t } = useTranslation();
  const { selectedRoom } = useSelectedRoomtypeStore();

  const selectedRoomId = selectedRoom.id;
  const ratesPlan = selectedRoom.ratesPlan;

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
      {selectedRoom.ratesPlan && (
        <Typography variant='sm' weight='semibold' className='mb-4'>
          Desde{' '}
          {`${formatCurrency(
            getRatesPerRoom(ratesPlan, selectedRoomId)?.amountBeforeTax,
            getRatesPerRoom(ratesPlan, selectedRoomId)?.curency,
          )}`}{' '}
          x noche
        </Typography>
      )}
      <Button
        type='link'
        href={`/room-type/${selectedRoom.id}`}
        scroll={true}
        className='mb-4 md:mb-0 md:w-full'
        disabled={!selectedRoom.ratesPlan}
        withSearchParams={true}
      >
        {selectedRoom.ratesPlan ? t('button.search') : t('button.choose-room')}
      </Button>
    </Container>
  );
}
