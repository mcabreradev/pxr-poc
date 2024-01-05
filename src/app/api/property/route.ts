import { NextRequest, NextResponse } from 'next/server';

import api from '@/lib/api-cache';

export async function GET(request: NextRequest) {
  const propertyId = request.nextUrl.searchParams.get('propertyId');
  const res = await api.get(`/v1/dev/property/${propertyId}`);

  return NextResponse.json(res.property);
}
