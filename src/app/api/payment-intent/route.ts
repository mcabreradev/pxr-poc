import { NextRequest, NextResponse } from 'next/server';

import api from '@/lib/pegaso';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await api.post(`/payment/create`, body);

  return NextResponse.json({ clientSecret: res.clientSecret });
}
