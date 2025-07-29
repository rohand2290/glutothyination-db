import { NextResponse } from 'next/server';
import { getEntries2020 } from '@/lib/db';

export async function GET() {
  const data = await getEntries2020();
  return NextResponse.json(data);
} 