import { NextRequest, NextResponse } from 'next/server';

import api from '@/lib/api-pegaso';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await api.post(`/v1/dev/revervation`, body);

  return NextResponse.json({ clientSecret: res.clientSecret });
}
