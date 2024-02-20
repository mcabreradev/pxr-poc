'use client';

import RoomTypePage from '@/features/room-type/page';

type Props = {
  params: { roomTypeId: number };
};

export default function Page({ params }: Props) {
  const { roomTypeId } = params;

  return <RoomTypePage roomTypeId={roomTypeId} />;
}
