/* eslint-disable simple-import-sort/imports */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCheckinCheckoutHook } from '@/hooks';

import Card from '@/components/card';
import Swiper from '@/components/swiper';

import { useGlobalStore, useSelectedRoomtypeStore } from '@/store';

import { paxerImage } from '@/lib/images';
import { cn } from '@/lib/utils';
import { useRoomTypeWithRatesPlansQuery } from '@/queries';
import { SelectedRoomtype } from '@/types';

const RoomSelectionComponent = () => {
  const { t, i18n } = useTranslation();
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoomtype>();
  const { setSelectedRoomtype } = useSelectedRoomtypeStore();
  const { checkin, checkout } = useCheckinCheckoutHook();
  const { openDatepickerDrawer } = useGlobalStore();

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
    roomTypeWithRatesPlans?.[1] ?? [],
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
      openDatepickerDrawer();
    },
    [openDatepickerDrawer, setSelectedRoomtype],
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

        const { url = '' } = room.photos[0] || {};
        const { amountBeforeTax = NaN } = ratesPlan[0] ?? { rate: NaN };

        return (
          <Card
            key={`hotel-room-${index}-card`}
            className={cn(
              'cursor-pointer opacity-80 transition-shadow duration-300 hover:shadow-lg',
              { 'opacity-100 shadow-lg': selectedRoom?.id === id },
            )}
            id={id}
            name={name[i18n.language] ?? t('title.room')}
            description={description}
            maxCapacity={maxCapacity}
            standardCapacity={standardCapacity}
            rate={amountBeforeTax} // here change to rate o amountBeforeTax
            image={paxerImage(url)}
            onClick={() => handleRoomSelection(room)}
          />
        );
      })}
    </Swiper>
  );
};

export default memo(RoomSelectionComponent);
