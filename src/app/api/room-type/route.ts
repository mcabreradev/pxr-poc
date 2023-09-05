import { NextRequest, NextResponse } from 'next/server';

import { getFirstOwnProperty } from '@/lib/helper';
import api from '@/lib/pegaso';

export async function GET(request: NextRequest) {
  const propertyId = request.nextUrl.searchParams.get('propertyId');
  const roomTypeId = request.nextUrl.searchParams.get('roomTypeId');
  const res = await api.get(`/property/${propertyId}/roomtype/${roomTypeId}`);
  const room = getFirstOwnProperty(res.roomTypes);
  return NextResponse.json(room);
}
