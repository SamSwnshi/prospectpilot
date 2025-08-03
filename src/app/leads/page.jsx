'use client';

import { useEffect, useState } from 'react';

export default function LeadsPage() {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        fetch('/api/leads')
            .then(res => res.json())
            .then(setLeads);
    }, []);

    return (
        <main className="max-w-5xl mx-auto mt-12 p-4">
            <h1 className="text-3xl mb-6 font-semibold">Leads Preview</h1>

            {leads.length === 0 && <p>No leads found. Generate some first.</p>}

            {leads.length > 0 && (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2 text-left">Name</th>
                            <th className="border border-gray-300 p-2 text-left">Email</th>
                            <th className="border border-gray-300 p-2 text-left">Score</th>
                            <th className="border border-gray-300 p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">{lead.name}</td>
                                <td className="border border-gray-300 p-2">{lead.email}</td>
                                <td className="border border-gray-300 p-2">{(lead.score * 100).toFixed(0)}%</td>
                                <td className="border border-gray-300 p-2">
                                    <a
                                        href={`/leads/${lead.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Email/Edit
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    );
}
