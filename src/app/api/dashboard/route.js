import { db } from "@/lib/db";
import { leads, callLogs } from "@/lib/dbSchema/schema";

export async function GET() {
  try {
    const leadsTest = await db.select().from(leads).limit(1);
    return new Response(JSON.stringify(leadsTest), { status: 200 });
  } catch (err) {
    console.error("Dashboard API Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
