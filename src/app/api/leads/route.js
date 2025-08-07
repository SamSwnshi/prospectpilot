import { db } from "@/lib/db";
import { leads } from "@/lib/dbSchema/schema";
import { ne } from "drizzle-orm";

export async function GET() {
  try {
    const realLeads = await db
      .select()
      .from(leads)
      .where(ne(leads.source, "mock"))  // exclude mock leads
      .limit(100);

    return new Response(JSON.stringify(realLeads), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to fetch leads:", err);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
