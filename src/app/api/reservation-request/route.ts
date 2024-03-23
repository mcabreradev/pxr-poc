import { NextRequest, NextResponse } from 'next/server';

import api from '@/lib/api-pegaso';

import { propertyId } from '@/constants/env';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await api.post(
    `/service/rest/Reservation/d/HOT${propertyId}/method/createOrUpdateReservationRequest?params={"reservationRequest":${JSON.stringify(body)}}`,
  );

  return NextResponse.json({ res });
}
