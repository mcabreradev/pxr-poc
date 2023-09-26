'use client';

import React from 'react';

import RoomTypeComponent from '@/features/room-type/room-type';

export default function Page() {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  return <RoomTypeComponent />;
}
