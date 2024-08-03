import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto
export const POST = async (_request: NextRequest) => {
  // URL Query Parameters
  // const searchParams = request.nextUrl.searchParams;
  // const query = searchParams.get('query');
  // query is "hello" for /api/search?query=hello

  // Request Body
  // const res = await request.json()

  return Response.json({ data: 'Error: API not yet implemented' });
};
