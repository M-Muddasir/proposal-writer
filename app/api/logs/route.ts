import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CSV_PATH = path.join(process.cwd(), 'data', 'proposals.csv');

export async function GET() {
  if (!fs.existsSync(CSV_PATH)) {
    return NextResponse.json({ error: 'No logs yet' }, { status: 404 });
  }

  const csv = fs.readFileSync(CSV_PATH, 'utf-8');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="proposals-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}
