import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const country = request.headers.get('cf-ipcountry') ?? '';
  return NextResponse.json({ status: 'success', data: { country: country } });
}
