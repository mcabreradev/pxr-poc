/* eslint-disable simple-import-sort/imports */
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Typography from '@/components/typography';
import Datepicker from './datepicker';
import Dropdown from './dropdown';

import useSelectedRoomtypeStore from '@/store/use-selected-roomtype.store';

import { formatCurrency } from '@/lib/number';

interface Props {
  className?: string;
}

const Container = tw.div`
sticky bottom-0 top-5 ml-5 mt-5 box-border flex h-min w-full flex-col rounded border-[1px] border-solid border-neutral-50 bg-white p-5 drop-shadow-lg`;

export default function GuestFormComponent({ className }: Props) {
  const { t } = useTranslation();
  const { selectedRoom } = useSelectedRoomtypeStore();

  return (
    <Container className={cn(className)}>
      <Typography variant='sm' weight='semibold' className='mb-4'>
        {`${t('checkin')} - ${t('checkout')}`}
      </Typography>

      <Datepicker />

      <Typography variant='sm' weight='semibold' className='my-4'>
        {t('info.guest')}
      </Typography>

      <Dropdown />

      <hr />
      {selectedRoom.roomPrice && (
        <Typography variant='sm' weight='semibold' className='mb-4'>
          Desde {`${formatCurrency(Number(selectedRoom.roomPrice) ?? 0)}`} x
          noche
        </Typography>
      )}
      <Button
        type='link'
        href={`/room-type/${selectedRoom.id}`}
        scroll={true}
        className='mb-4 md:mb-0 md:w-full'
        disabled={!selectedRoom.roomPrice}
        withSearchParams={true}
      >
        {t('button.choose-room')}
      </Button>
    </Container>
  );
}
