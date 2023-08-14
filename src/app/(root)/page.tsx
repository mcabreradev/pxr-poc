'use client';

import React from 'react';

import HotelPage from '@/features/hotel/hotel-page';

export default function Page({ params }: { params: { hotel: string } }) {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  const { hotel } = params;

  return (
    <>
      <HotelPage hotel={hotel} />
    </>
  );
}
