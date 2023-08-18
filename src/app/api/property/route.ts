import { NextRequest } from 'next/server';

import { get } from '@/lib/api';

export async function GET(request: NextRequest) {
  const hotid = request.nextUrl.searchParams.get('hotid');
  const res = await get('/property/' + hotid);

  return new Response(JSON.stringify(res.property), {
    status: 200,
  });
}
