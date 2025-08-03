export async function POST(request) {
  const { to, content } = await request.json();

  // MOCK: Just log the email sending (replace with SendGrid or SMTP later)
  console.log("Mock sending email to:", to);
  console.log("Content:", content);

  return new Response(
    JSON.stringify({ success: true, message: "Email sent (mock)" }),
    { status: 200 }
  );
}
