import { NextRequest, NextResponse } from 'next/server';

import { get } from '@/lib/pegaso';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  const res = await get(`/property/${id}`);

  return NextResponse.json(res.property);
}
