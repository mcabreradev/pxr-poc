'use client';

import useHydration from '@/hooks/use-hydration';

import RoomTypePage from '@/features/room-type/page';

type Props = {
  params: { roomtype: string };
};

export default function Page({ params }: Props) {
  const { roomtype } = params;

  const { isHydrated } = useHydration();
  if (!isHydrated || !roomtype) {
    return null;
  }

  return <RoomTypePage roomtype={roomtype} />;
}
