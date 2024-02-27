/* eslint-disable simple-import-sort/imports */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { useSearchParamOrStore } from '@/hooks';
import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Image from '@/components/image';
import Swiper from '@/components/swiper';
import Typography from '@/components/typography';

import useSelectedRoomtypeStore from '@/store/use-selected-roomtype.store';

import { PROPERTY_CURRENCY } from '@/constants';
import { formatCurrency, getRatesPerRoom } from '@/lib/number';
import { useRoomTypeWithRatesPlansQuery } from '@/queries/use-roomtypes.query';
import { SelectedRoomtype } from '@/types';

const Rooms = tw.div`
  box-border h-auto w-[271px] border-[1px] border-solid border-gray-50 bg-white shadow
`;

const RoomSwiper = () => {
  const { t, i18n } = useTranslation();
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoomtype>();
  const { setSelectedRoomtype } = useSelectedRoomtypeStore();
  const { getCheckin, getCheckout } = useSearchParamOrStore();

  const checkin = getCheckin();
  const checkout = getCheckout();

  const { data, pending, loading, error } = useRoomTypeWithRatesPlansQuery({
    checkin,
    checkout,
  });

  const [roomtypes, ratesPlan] = [data?.[0], data?.[1]];

  const handleClick = useCallback(
    (room: SelectedRoomtype) => {
      const roomPrice = getRatesPerRoom(ratesPlan, room.id);
      const filteredRatesPlan = ratesPlan.filter(
        (r) => r.roomTypeId === room.id && r.currency === PROPERTY_CURRENCY,
      );

      setSelectedRoom(room);
      setSelectedRoomtype({
        ...room,
        roomPrice,
        ratesPlan: filteredRatesPlan,
      });
    },
    [ratesPlan, setSelectedRoomtype],
  );

  if (loading) {
    return 'loading';
  }

  if (pending) {
    return 'pending';
  }

  if (error) {
    return 'error';
  }

  return (
    <Swiper className='md:w-[570px]' withArrow={true} scroll={300}>
      {roomtypes.map((room, index) => {
        const roomRate = getRatesPerRoom(ratesPlan, room.id);
        const formattedCurrency = formatCurrency(
          roomRate?.amountBeforeTax,
          roomRate?.currency,
        );
        return (
          <Rooms
            key={`hotel-room-${index}`}
            className={cn({
              'cursor-pointer opacity-80 transition-shadow duration-300 hover:shadow-lg':
                true,
              'opacity-100 shadow-lg': selectedRoom?.id === room.id,
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
                {room.name[i18n.language] ?? t('title.room')} {room.id}
              </Typography>
              <Typography className='pb-1'>
                {`Max ${room.maxCapacity} ${t('person.plural')}`}
              </Typography>
              <Typography className='pb-4'>{room.description}</Typography>
              <Typography weight='medium' className='pb-6 underline'>
                {room.standardCapacity} {t('person.plural')}
              </Typography>
              <Typography className='pb-5' variant='base'>
                <>
                  {t('from')} <b>{formattedCurrency}</b>
                  {t('night.singular')}
                </>
              </Typography>

              <Button
                type='button'
                className='mb-4 md:w-full'
                onClick={() => handleClick(room)}
              >
                {t('button.reserve')}
              </Button>
            </div>
          </Rooms>
        );
      })}
    </Swiper>
  );
};

export default memo(RoomSwiper);
