import { db } from "@/lib/db";
import { leads, callLogs } from "@/lib/dbSchema/schema";



export async function GET() {
  try {
    console.log("Fetching dashboard counts...");

    // Use $count helper to get total rows in each table
    const leadsCount = await db.$count(leads);
    const callsCount = await db.$count(callLogs);

    // Return counts as JSON object
    return new Response(
      JSON.stringify({
        leads: leadsCount,
        emailsSent: leadsCount,  // or any other logic for emails sent
        calls: callsCount,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Dashboard API error:", error);
    return new Response(
      JSON.stringify({
        leads: 0,
        emailsSent: 0,
        calls: 0,
        error: "Failed to fetch dashboard stats",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}