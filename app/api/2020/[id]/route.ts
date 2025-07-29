import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { PaperEntry } from '@/lib/types';

const data2020: PaperEntry[] = [
  { id: 1, proteinName: 'Protein D', geneName: 'Gene W', region: 'Region 4', cysteineNumber: 4 },
  { id: 2, proteinName: 'Protein E', geneName: 'Gene V', region: 'Region 5', cysteineNumber: 2 },
  { id: 3, proteinName: 'Protein F', geneName: 'Gene U', region: 'Region 6', cysteineNumber: 5 },
];

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const entry = data2020.find((e: PaperEntry) => e.id === Number(params.id));
  if (!entry) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }
  return NextResponse.json(entry);
} 