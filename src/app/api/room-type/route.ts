import { NextRequest, NextResponse } from 'next/server';

import { getFirstOwnProperty } from '@/lib/helper';
import api from '@/lib/pegaso';

export async function GET(request: NextRequest) {
  const propertyId = request.nextUrl.searchParams.get('propertyId');
  const roomtype = request.nextUrl.searchParams.get('roomtype');
  const res = await api.get(`/property/${propertyId}/roomtype/${roomtype}`);
  const room = getFirstOwnProperty(res.roomTypes);

  return NextResponse.json(room);
}
