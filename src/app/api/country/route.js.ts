import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const country = request.headers.get('cloudfront-viewer-country') ?? '';
  return NextResponse.json({ status: 'success', data: { country: country } });
}
