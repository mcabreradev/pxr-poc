import { NextRequest, NextResponse } from 'next/server';

import api from '@/lib/api-cache';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const params = JSON.stringify(body);
  const res = await api.post(`/v1/dev/guest/check?params=${params}`);

  return NextResponse.json({ res });
}
