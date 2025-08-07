import { db } from "@/lib/db";
import { businessInputs, leads } from "@/lib/dbSchema/schema"; // Make sure this path matches your project



export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Request body:", body);

    const result = await db.insert(businessInputs).values({
      name: body.name,
      description: body.description,
      keywords: body.keywords || null,
      location: body.location,
    }).returning();

    const inputId = result[0].id;
    console.log("Inserted businessInput ID:", inputId);

    if (Array.isArray(body.leads) && body.leads.length > 0) {
      console.log(`Inserting ${body.leads.length} leads.`);
      for (const lead of body.leads) {
        const insertedLead = await db.insert(leads).values({
          ...lead,
          businessInputId: inputId,
          source: lead.source || "generate",
        }).returning();
        console.log("Inserted Lead:", insertedLead);
      }
    } else {
      console.log("No leads to insert.");
    }

    return new Response(JSON.stringify({ inputId }), { status: 201 });
  } catch (err) {
    console.error("Failed to generate leads:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

