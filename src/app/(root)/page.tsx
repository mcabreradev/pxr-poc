import React from 'react';

import HotelPage from '@/features/hotel/hotel-page';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <React.Fragment>
      <HotelPage hotid={searchParams.hotid} />
    </React.Fragment>
  );
}
