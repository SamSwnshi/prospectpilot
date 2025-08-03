'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [stats, setStats] = useState({ leads: 0, emailsSent: 0, calls: 0 });

    useEffect(() => {
        fetch('/api/dashboard')
            .then(res => res.json())
            .then(setStats);
    }, []);

    return (
        <main className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow">
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
            <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                    <h2 className="text-xl font-medium">Leads</h2>
                    <p className="text-4xl font-bold">{stats.leads}</p>
                </div>
                <div>
                    <h2 className="text-xl font-medium">Emails Sent</h2>
                    <p className="text-4xl font-bold">{stats.emailsSent}</p>
                </div>
                <div>
                    <h2 className="text-xl font-medium">Calls Logged</h2>
                    <p className="text-4xl font-bold">{stats.calls}</p>
                </div>
            </div>
        </main>
    );
}
