import { getEntries2019 } from '@/lib/db';
import { NextResponse } from 'next/server';

const data2019 = [
  { id: 1, data: 'Entry 1 from 2019' },
  { id: 2, data: 'Entry 2 from 2019' },
  { id: 3, data: 'Entry 3 from 2019' },
];

export async function GET() {
  let res = await getEntries2019();
  return NextResponse.json(res);
} 