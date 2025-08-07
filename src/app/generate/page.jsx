'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BusinessInputForm() {
    const [form, setForm] = useState({
        name: '',
        description: '',
        keywords: '',
        location: '',
    });

    // Lead form state - start with one lead
    const [lead, setLead] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        score: '',
    });

    const [loading, setLoading] = useState(false);

    // Handle input changes for business input form
    const onChangeForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // Handle input changes for lead form
    const onChangeLead = (e) => setLead({ ...lead, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Prepare leads array with one lead, parsing score to number
        const leads = [{
            ...lead,
            score: lead.score ? parseFloat(lead.score) : null,
        }];

        const payload = {
            ...form,
            leads,
        };

        try {
            const res = await fetch('/api/lead/generate', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error(`API error: ${res.statusText}`);
            }

            // Optional: reset form or navigate
            window.location.href = '/leads';
        } catch (error) {
            console.error("Failed to generate leads:", error);
            alert("Failed to generate leads. See console for details.");
        }

        setLoading(false);
    };

    return (
        <main className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-3xl mb-6 font-semibold">Generate Leads</h1>
            <form onSubmit={onSubmit} className="space-y-6">

                {/* Business Input Fields */}
                <div>
                    <label htmlFor="name" className="block font-medium mb-1">Business Name</label>
                    <Input name="name" id="name" required value={form.name} onChange={onChangeForm} />
                </div>
                <div>
                    <label htmlFor="description" className="block font-medium mb-1">Business Description (Optional)</label>
                    <Input name="description" id="description" value={form.description} onChange={onChangeForm} />
                </div>
                <div>
                    <label htmlFor="keywords" className="block font-medium mb-1">Target Keywords / Industry</label>
                    <Input name="keywords" id="keywords" value={form.keywords} onChange={onChangeForm} />
                </div>
                <div>
                    <label htmlFor="location" className="block font-medium mb-1">Target Location (City/State/Country)</label>
                    <Input name="location" id="location" required value={form.location} onChange={onChangeForm} />
                </div>

                <hr className="my-6" />

                {/* Lead Input Fields */}
                <h2 className="text-2xl mb-4 font-semibold">Lead Information</h2>

                <div>
                    <label htmlFor="lead-name" className="block font-medium mb-1">Name</label>
                    <Input name="name" id="lead-name" required value={lead.name} onChange={onChangeLead} />
                </div>
                <div>
                    <label htmlFor="email" className="block font-medium mb-1">Email</label>
                    <Input type="email" name="email" id="email" required value={lead.email} onChange={onChangeLead} />
                </div>
                <div>
                    <label htmlFor="phone" className="block font-medium mb-1">Phone</label>
                    <Input name="phone" id="phone" value={lead.phone} onChange={onChangeLead} />
                </div>
                <div>
                    <label htmlFor="address" className="block font-medium mb-1">Address</label>
                    <Input name="address" id="address" value={lead.address} onChange={onChangeLead} />
                </div>
                <div>
                    <label htmlFor="website" className="block font-medium mb-1">Website</label>
                    <Input name="website" id="website" value={lead.website} onChange={onChangeLead} />
                </div>
                <div>
                    <label htmlFor="score" className="block font-medium mb-1">Score</label>
                    <Input type="number" step="0.01" min="0" max="1" name="score" id="score" value={lead.score} onChange={onChangeLead} />
                </div>

                <Button
                    type="submit"
                    className="px-5 py-2 rounded bg-blue-600 text-white font-semibold disabled:opacity-50"
                    disabled={loading}
                    variant="outline"
                >
                    {loading ? 'Generating...' : 'Generate Leads'}
                </Button>

            </form>
        </main>
    );
}
