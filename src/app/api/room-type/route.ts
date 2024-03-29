import { NextRequest, NextResponse } from 'next/server';

import api from '@/lib/api-cache';
import { getFirstOwnProperty } from '@/lib/helper';

export async function GET(request: NextRequest) {
  const propertyId = request.nextUrl.searchParams.get('propertyId');
  const roomTypeId = request.nextUrl.searchParams.get('roomTypeId');
  const res = await api.get(
    `/v1/dev/property/${propertyId}/roomtype/${roomTypeId}`,
  );
  const room = getFirstOwnProperty(res.roomTypes);

  return NextResponse.json(room);
}
