/* eslint-disable simple-import-sort/imports */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { useCheckinCheckoutHook } from '@/hooks';
import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Image from '@/components/image';
import Swiper from '@/components/swiper';
import Typography from '@/components/typography';

import useSelectedRoomtypeStore from '@/store/use-selected-roomtype.store';

import { PROPERTY_CURRENCY } from '@/constants';
import { formatCurrency } from '@/lib/number';
import { useRoomTypeWithRatesPlansQuery } from '@/queries/use-roomtypes.query';
import { SelectedRoomtype } from '@/types';

const Rooms = tw.div`
  box-border h-auto w-[271px] border-[1px] border-solid border-gray-50 bg-white shadow
`;

const RoomSelectionComponent = () => {
  const { t, i18n } = useTranslation();
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoomtype>();
  const { setSelectedRoomtype } = useSelectedRoomtypeStore();
  const { checkin, checkout } = useCheckinCheckoutHook();

  const {
    data: roomTypeWithRatesPlans,
    pending,
    loading,
    error,
  } = useRoomTypeWithRatesPlansQuery({
    checkin,
    checkout,
  });
  const [roomtypes, ratesPlan] = [
    roomTypeWithRatesPlans?.[0],
    roomTypeWithRatesPlans?.[1],
  ];
  const roomtypesWithRatesPlan = roomtypes?.map((room) => {
    return {
      ...room,
      ratesPlan: ratesPlan.filter(({ roomTypeId }) => roomTypeId === room.id),
    };
  });

  const handleRoomSelection = useCallback(
    (room: SelectedRoomtype) => {
      setSelectedRoom(room);
      setSelectedRoomtype(room);
    },
    [setSelectedRoomtype],
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
      {roomtypesWithRatesPlan?.map((room, index) => {
        const {
          id,
          name,
          description,
          maxCapacity,
          standardCapacity,
          ratesPlan,
        } = room;

        // console.log('ratesPlan', ratesPlan);

        return (
          <Rooms
            key={`hotel-room-${index}`}
            className={cn({
              'cursor-pointer opacity-80 transition-shadow duration-300 hover:shadow-lg':
                true,
              'opacity-100 shadow-lg': selectedRoom?.id === id,
            })}
          >
            <Image
              alt={name}
              src={`/images/hotel/room${index + 1}.webp`}
              width={271}
              height={235}
              className='w-full object-cover'
              title={t('title.room')}
            />
            <div className='p-4'>
              <Typography variant='h3' weight='medium' className='pb-4'>
                {name[i18n.language] ?? t('title.room')} {id}
              </Typography>
              <Typography className='pb-1'>
                {`Max ${maxCapacity} ${t('person.plural')}`}
              </Typography>
              <Typography className='pb-4'>{description}</Typography>
              <Typography weight='medium' className='pb-6 underline'>
                {standardCapacity} {t('person.plural')}
              </Typography>
              <Typography className='pb-5' variant='base'>
                <>
                  {t('from')}{' '}
                  <b>
                    {formatCurrency(
                      ratesPlan[0]?.amountBeforeTax ?? NaN, // here chacge to rate o amountBeforeTax
                      ratesPlan[0]?.currency ?? PROPERTY_CURRENCY,
                    )}
                  </b>{' '}
                  {t('night.singular')}
                </>
              </Typography>

              <Button
                type='button'
                className='mb-4 md:w-full'
                onClick={() => handleRoomSelection(room)}
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

export default memo(RoomSelectionComponent);
