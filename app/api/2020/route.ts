import { NextResponse } from 'next/server';

const data2020 = [
  { id: 1, data: 'Entry 1 from 2020' },
  { id: 2, data: 'Entry 2 from 2020' },
  { id: 3, data: 'Entry 3 from 2020' },
];

export async function GET() {
  return NextResponse.json(data2020);
} 