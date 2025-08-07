'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [stats, setStats] = useState({ leads: 0, emailsSent: 0, calls: 0 });

    useEffect(() => {
        fetch('/api/dashboard')
            .then(res => {
                if (!res.ok) throw new Error('API response not OK');
                return res.json();
            })
            .then(data => {
                console.log('Dashboard fetched from API:', data);
                setStats(data);
            })
            .catch(error => {
                console.error('Failed to fetch dashboard data:', error);
                setStats({ leads: 0, emailsSent: 0, calls: 0 });
            });
    }, []);

    return (
        <main className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow">
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
            <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                    <h2 className="text-xl font-medium">Leads</h2>
                    <p className="text-4xl font-bold">{stats?.leads ?? 0}</p>
                </div>
                <div>
                    <h2 className="text-xl font-medium">Emails Sent</h2>
                    <p className="text-4xl font-bold">{stats?.emailsSent ?? 0}</p>
                </div>
                <div>
                    <h2 className="text-xl font-medium">Calls Logged</h2>
                    <p className="text-4xl font-bold">{stats?.calls ?? 0}</p>
                </div>
            </div>
        </main>
    );
}
