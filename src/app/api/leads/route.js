import { db } from "@/lib/db";
import { leads } from "@/lib/dbSchema/schema";

export async function GET() {
    const allLeads = await db.select().from(leads).limit(50);

    return new Response(JSON.stringify(allLeads),{
        status: 200,
        headers: {'Content-Type': 'application/json'}
    })
}