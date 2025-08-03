import { db } from '@/lib/db';
import { callLogs } from '@/lib/dbSchema/schema';

export async function POST(request) {
  const { leadId, outcome, notes } = await request.json();

  if (!leadId || !outcome) {
    return new Response('leadId and outcome are required', { status: 400 });
  }

  await db.insert(callLogs).values({
    leadId,
    outcome,
    notes: notes || null
  });

  return new Response(JSON.stringify({ success: true }), { status: 201 });
}
