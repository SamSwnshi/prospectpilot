import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-center ">
      <div>
        <h1 className="text-3xl font-bold mb-4">Welcome to ProspectPilot</h1>
        <div className="flex gap-3">
          <Link href="/generate" className="px-4 py-2 rounded bg-blue-600 text-white">Generate Leads</Link>
          <Link href="/leads" className="px-4 py-2 rounded bg-green-600 text-white">View Leads</Link>
          <Link href="/dashboard" className="px-4 py-2 rounded bg-gray-600 text-white">Dashboard</Link>
        </div>
      </div>
    </main>
  );
}
