'use client';

import React from 'react';

import RoomTypeComponent from '@/features/room-type/room-type';

interface Props {
  params: { roomTypeId: string };
}

export default function Page({ params }: Props) {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  return <RoomTypeComponent roomTypeId={params.roomTypeId} />;
}
