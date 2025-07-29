import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { PaperEntry } from '@/lib/types';

const data2019: PaperEntry[] = [
  { id: 1, proteinName: 'Protein A', geneName: 'Gene X', region: 'Region 1', cysteineNumber: 2 },
  { id: 2, proteinName: 'Protein B', geneName: 'Gene Y', region: 'Region 2', cysteineNumber: 3 },
  { id: 3, proteinName: 'Protein C', geneName: 'Gene Z', region: 'Region 3', cysteineNumber: 1 },
];

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const entry = data2019.find((e: PaperEntry) => e.id === Number(params.id));
  if (!entry) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }
  return NextResponse.json(entry);
} 