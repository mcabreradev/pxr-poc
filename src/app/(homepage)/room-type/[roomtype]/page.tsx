'use client';

import useHydration from '@/hooks/use-hydration';

import RoomTypeComponent from '@/features/room-type/room-type';

type Props = {
  params: { roomtype: string };
};

export default function Page({ params }: Props) {
  const { roomtype } = params;

  const { isHydrated } = useHydration();
  if (!isHydrated || !roomtype) {
    return null;
  }

  return <RoomTypeComponent roomtype={roomtype} />;
}
