/* eslint-disable simple-import-sort/imports */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { useSearchParamOrStore } from '@/hooks';
import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Image from '@/components/image';
import Swiper from '@/components/swiper';
import Typography from '@/components/typography';

import useSelectedRoomtypeStore from '@/store/use-selected-roomtype.store';

import { CHECKIN, CHECKOUT } from '@/constants';
import { formatCurrency } from '@/lib/number';
import { useRatesPlanQuery, useRoomTypesQuery } from '@/queries';

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
  const { get } = useSearchParamOrStore();

  const checkin = get(CHECKIN, CHECKIN);
  const checkout = get(CHECKOUT, CHECKOUT);

  const { data: ratesPlan } = useRatesPlanQuery({
    checkin: checkin || null,
    checkout: checkout || null,
  });

  const handleClick = useCallback(
    (
      room: { [key: string]: string | number | null },
      roomPrice: { [key: string]: string },
    ) => {
      setSelectedRoom(room.id);
      setSelectedRoomtype({
        ...room,
        roomPrice,
      });
    },
    [setSelectedRoomtype],
  );

  function getRatesPerRoom(roomId: string | number | null) {
    const plan = ratesPlan.filter(({ roomTypeId }) => roomTypeId === roomId)[0];

    if (!plan) return;

    const productDates = Object.keys(plan?.productDates).map(
      (date) => plan?.productDates[date],
    );

    const rates = productDates[0].rates[1];

    return {
      ...rates,
      currency: productDates[0].currency,
    };
  }

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
              {room.name[i18n.language] ?? t('title.room')} {' ->' + room.id}
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
                {t('from')}{' '}
                <b>
                  {formatCurrency(
                    getRatesPerRoom(room.id)?.rate,
                    getRatesPerRoom(room.id)?.curency,
                  )}
                  /
                </b>
                {t('night.singular')}
              </>
            </Typography>

            <Button
              type='button'
              className='mb-4 md:w-full'
              onClick={() => handleClick(room, getRatesPerRoom(room.id))}
            >
              {t('button.reserve')}
            </Button>
          </div>
        </Rooms>
      ))}
    </Swiper>
  );
}
