import { NextRequest, NextResponse } from 'next/server';

import api from '@/lib/api-cache';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await api.post(`/v2/:environment/payment/create`, body);

  return NextResponse.json(res);
}
