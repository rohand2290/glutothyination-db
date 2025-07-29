import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { PaperEntry } from '@/lib/types';

const data2023: PaperEntry[] = [
  { id: 1, proteinName: 'Protein J', geneName: 'Gene Q', region: 'Region 10', cysteineNumber: 1 },
  { id: 2, proteinName: 'Protein K', geneName: 'Gene P', region: 'Region 11', cysteineNumber: 2 },
  { id: 3, proteinName: 'Protein L', geneName: 'Gene O', region: 'Region 12', cysteineNumber: 3 },
];

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const entry = data2023.find((e: PaperEntry) => e.id === Number(params.id));
  if (!entry) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }
  return NextResponse.json(entry);
} 