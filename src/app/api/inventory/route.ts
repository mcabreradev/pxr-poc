import { NextRequest, NextResponse } from 'next/server';

import api from '@/lib/api-cache';

export async function GET(request: NextRequest) {
  const propertyId = request.nextUrl.searchParams.get('propertyId');
  const from = request.nextUrl.searchParams.get('from');
  const to = request.nextUrl.searchParams.get('to');
  const res = await api.get(
    `/inventory/${propertyId}/availability?from=${from}&to=${to}`,
  );

  return NextResponse.json(res.availability);
}
