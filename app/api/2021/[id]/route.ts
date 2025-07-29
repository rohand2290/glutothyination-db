import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { PaperEntry } from '@/lib/types';

const data2021: PaperEntry[] = [
  { id: 1, proteinName: 'Protein G', geneName: 'Gene T', region: 'Region 7', cysteineNumber: 3 },
  { id: 2, proteinName: 'Protein H', geneName: 'Gene S', region: 'Region 8', cysteineNumber: 2 },
  { id: 3, proteinName: 'Protein I', geneName: 'Gene R', region: 'Region 9', cysteineNumber: 4 },
];

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const entry = data2021.find((e: PaperEntry) => e.id === Number(params.id));
  if (!entry) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }
  return NextResponse.json(entry);
} 