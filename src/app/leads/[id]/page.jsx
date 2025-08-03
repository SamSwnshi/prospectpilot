'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function LeadEmailPage() {
    const params = useParams();
    const leadId = params.id;

    const [lead, setLead] = useState(null);
    const [draft, setDraft] = useState('');
    const [sent, setSent] = useState(false);

    useEffect(() => {
        fetch(`/api/leads/${leadId}`)
            .then(res => res.json())
            .then(data => {
                setLead(data);
                setDraft(data.emailDraft || `Hi ${data.name},\n\nWe help businesses like yours grow fast!`);
            });
    }, [leadId]);

    const handleSend = async () => {
        await fetch('/api/email/send', {
            method: 'POST',
            body: JSON.stringify({ to: lead.email, content: draft })
        });
        setSent(true);
    };

    if (!lead) return (<div className="flex items-center justify-center h-screen"><p className="text-3xl">Loading...</p>
    </div>);

    return (
        <main className="max-w-lg mx-auto mt-12 p-6 bg-white rounded shadow">
            <h1 className="text-3xl font-semibold mb-6">Email Lead: {lead.name}</h1>
            <textarea
                className="w-full p-3 border border-gray-300 rounded mb-4 min-h-[150px] font-mono"
                value={draft}
                onChange={e => setDraft(e.target.value)}
            />
            <button
                className="bg-green-600 text-white px-5 py-2 rounded disabled:opacity-50"
                onClick={handleSend}
                disabled={sent}
            >
                {sent ? 'Email Sent!' : 'Send Email'}
            </button>
        </main>
    );
}
