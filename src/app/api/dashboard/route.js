import { db } from "@/lib/db";
import { leads, callLogs } from "@/lib/dbSchema/schema";

export async function GET() {
  const leadsCount = await db
    .select()
    .from(leads)
    .count("id as count")
    .limit(1);
  const callsCount = await db
    .select()
    .from(callLogs)
    .count("id as count")
    .limit(1);

  // For demo: emails sent = leads count (mock)
  return new Response(
    JSON.stringify({
      leads: Number(leadsCount[0].count),
      emailsSent: Number(leadsCount[0].count),
      calls: Number(callsCount[0].count),
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
