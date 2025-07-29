import { NextResponse } from 'next/server';
import { getEntries2023 } from '@/lib/db';

export async function GET() {
  const data = await getEntries2023();
  return NextResponse.json(data);
} 