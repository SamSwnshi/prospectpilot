'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

export default function BusinessInputForm() {
    const [form, setForm] = useState({ name: '', description: '', keywords: '', location: '' });
    const [loading, setLoading] = useState(false);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await fetch('/api/lead/generate', {
            method: 'POST',
            body: JSON.stringify(form)
        });
        setLoading(false);
        window.location.href = '/leads';
    };

    return (
        <main className="max-w-xl  mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-3xl mb-6 font-semibold">Generate Leads</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block font-medium mb-1">Business Name</label>
                    <Input name="name" id="name" className="input" required value={form.name} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="description" className="block font-medium mb-1">Business Description (Optional)</label>
                    <Input name="description" id="description" className="input" value={form.description} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="keywords" className="block font-medium mb-1">Target Keywords / Industry</label>
                    <Input name="keywords" id="keywords" className="input" value={form.keywords} onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="location" className="block font-medium mb-1">Target Location (City/State/Country)</label>
                    <Input name="location" id="location" className="input" required value={form.location} onChange={onChange} />
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
