import { NextRequest, NextResponse } from 'next/server';

import api from '@/lib/api-cache';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await api.post(`/v2/dev/payment/create`, body);

  return NextResponse.json({ clientSecret: res.clientSecret, res });
}
