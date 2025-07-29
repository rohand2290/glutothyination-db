import { NextResponse } from 'next/server';
import { getEntries2021 } from '@/lib/db';

export async function GET() {
  const data = await getEntries2021();
  return NextResponse.json(data);
} 