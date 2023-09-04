import { NextRequest, NextResponse } from 'next/server';

import api from '@/lib/pegaso';

export async function GET(request: NextRequest) {
  try {
    const propertyId = request.nextUrl.searchParams.get('propertyId');
    const res = await api.get(`/property/${propertyId}/roomtypes`);
    const roomtypes = Object.values(res.roomTypes);
    return NextResponse.json(roomtypes);
  } catch (error) {
    return NextResponse.error();
  }
}
