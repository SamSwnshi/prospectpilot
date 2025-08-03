import { db } from "@/lib/db";
import { leads } from "@/lib/dbSchema/schema";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = request.url.split("/").pop();

  if (!id) {
    return new Response("Lead ID Required", { status: 400 });
  }

  const lead = await db
    .select()
    .from(leads)
    .where(leads.id.eq(Number(id)))
    .limit(1);

  if (!lead.length) {
    return new Response("Lead not found", { status: 404 });
  }

  const leadWithDraft = {
    ...lead[0],
    emailDraft: `Hi ${lead[0].name},\n\nWe help businesses like yours grow fast! Let’s chat.`,
  };

  return new Response(JSON.stringify(leadWithDraft), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
