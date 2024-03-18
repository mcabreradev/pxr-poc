import { NextRequest, NextResponse } from 'next/server';

import api from '@/lib/api-pegaso';

import { propertyId } from '@/constants/env';

export async function POST(request: NextRequest) {
  const queryParams = new URLSearchParams(request.nextUrl.search);
  const queryParam = queryParams.get('params');

  const res = await api.post(
    `/service/rest/Reservation/d/HOT${propertyId}/method/createOrUpdateReservationRequest/?params=${queryParam}`,
  );

  return NextResponse.json({ res });
}
