import { NextRequest, NextResponse } from 'next/server';

import { get } from '@/lib/pegaso';

export async function GET(request: NextRequest) {
  const propertyId = request.nextUrl.searchParams.get('propertyId');
  const res = await get(`/property/${propertyId}/roomtypes`);
  const roomtypes = Object.values(res.roomTypes);

  return NextResponse.json(roomtypes);
}
