import { NextRequest, NextResponse } from 'next/server';

import { SUCCESS } from '@/constants';

export async function GET(request: NextRequest) {
  const country = request.headers.get('cloudfront-viewer-country') ?? '';
  return NextResponse.json({ status: SUCCESS, data: { country: country } });
}
