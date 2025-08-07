'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SendEmailPage() {
  const [to, setTo] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, content }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Email sent successfully!');
        setTo('');
        setContent('');
      } else {
        setMessage(data.message || 'Failed to send email.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Send email error:', error);
    }

    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold mb-6">Send Email</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="to" className="block font-medium mb-1">
            To (Email address)
          </label>
          <Input
            type="email"
            id="to"
            name="to"
            required
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="recipient@example.com"
          />
        </div>
        <div>
          <label htmlFor="content" className="block font-medium mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={6}
            className="w-full rounded border border-gray-300 p-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your email content here..."
          />
        </div>
        <Button type="submit" disabled={loading} variant="outline" className="w-full py-2">
          {loading ? 'Sending...' : 'Send Email'}
        </Button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </main>
  );
}
