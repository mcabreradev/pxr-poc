import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { formatCurrency } from '@/lib/number';
import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Image from '@/components/image';
import Swiper from '@/components/swiper';
import Typography from '@/components/typography';

import useSelectedRoomtypeStore from '@/store/use-selected-roomtype.store';

import { PLAN_COSTS } from '@/constants';
import useRoomTypesQuery from '@/queries/use-roomtypes';

const Rooms = tw.div`
  box-border h-auto w-[271px] border-[1px] border-solid border-gray-50 bg-white shadow
`;

export default function RoomSwiper() {
  const { t, i18n } = useTranslation();
  const { isLoading, isError, data: roomtypes } = useRoomTypesQuery();
  const [selectedRoom, setSelectedRoom] = useState<string | number | null>(
    null,
  );
  const { setSelectedRoomtype } = useSelectedRoomtypeStore();

  const handleClick = useCallback(
    (room: { [key: string]: string | number | null }, index?: number) => {
      setSelectedRoom(room.id);
      setSelectedRoomtype({
        ...room,
        roomPrice: PLAN_COSTS[index as number],
      });
    },
    [setSelectedRoomtype],
  );

  if (isLoading) {
    return 'loading';
  }

  if (isError) {
    return 'error';
  }

  return (
    <Swiper className='md:w-[570px]' withArrow={true} scroll={300}>
      {roomtypes.map((room, index) => (
        <Rooms
          key={`hotel-room-${index}`}
          className={cn({
            'cursor-pointer opacity-80 transition-shadow duration-300 hover:shadow-lg':
              true,
            'opacity-100 shadow-lg': selectedRoom === room.id,
          })}
        >
          <Image
            alt={room.name}
            src={`/images/hotel/room${index + 1}.webp`}
            width={271}
            height={235}
            className='w-full object-cover'
            title={t('title.room')}
          />
          <div className='p-4'>
            <Typography variant='h3' weight='medium' className='pb-4'>
              {room.name[i18n.language] ?? t('title.room')}
            </Typography>
            <Typography className='pb-1'>
              {`Max ${room.maxCapacity} ${t('person.plural')}`}
            </Typography>
            <Typography className='pb-4'>{room.description}</Typography>
            <Typography weight='medium' className='pb-6 underline'>
              {room.standardCapacity} {t('person.plural')}
            </Typography>
            <Typography className='pb-5' variant='base'>
              {t('from')} <b>{formatCurrency(PLAN_COSTS[index])}/</b>
              {t('night.singular')}
            </Typography>

            <Button
              type='button'
              className='mb-4 md:w-full'
              onClick={() => handleClick(room, index)}
            >
              {t('button.reserve')}
            </Button>
          </div>
        </Rooms>
      ))}
    </Swiper>
  );
}
