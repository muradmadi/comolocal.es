import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [result, setResult] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);

        // Access key from environment variables
        const accessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY;

        if (!accessKey) {
            console.error('Web3Forms Access Key is missing! Make sure PUBLIC_WEB3FORMS_ACCESS_KEY is set in .env');
            setStatus('error');
            setResult("Configuration Error: API Key missing.");
            return;
        }

        formData.append("access_key", accessKey);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setResult(data.message);
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
                setResult(data.message || "Something went wrong.");
            }
        } catch (error) {
            setStatus('error');
            setResult("Failed to send message. Please try again later.");
        }
    };

    if (status === 'success') {
        return (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-card border border-border rounded-2xl animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground max-w-xs mx-auto mb-8">
                    Thanks for reaching out. We'll get back to you as soon as possible.
                </p>
                <Button
                    onClick={() => setStatus('idle')}
                    variant="outline"
                >
                    Send another message
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 relative">
            {/* Honeypot */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        disabled={status === 'submitting'}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        disabled={status === 'submitting'}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                <div className="relative">
                    <select
                        id="subject"
                        name="subject"
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        )}
                        disabled={status === 'submitting'}
                    >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Collaboration">Collaboration / Partnership</option>
                        <option value="Venue Suggestion">Venue Suggestion</option>
                        <option value="Event Promotion">Event Promotion</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className={cn(
                        "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                    )}
                    placeholder="Tell us what's on your mind..."
                    disabled={status === 'submitting'}
                />
            </div>

            {status === 'error' && (
                <div className="flex items-center gap-2 text-destructive text-sm p-3 rounded-md bg-destructive/10">
                    <AlertCircle className="w-4 h-4" />
                    <span>{result}</span>
                </div>
            )}

            <Button
                type="submit"
                className="w-full h-12 text-base"
                disabled={status === 'submitting'}
            >
                {status === 'submitting' ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                    </>
                )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
                We respect your privacy. No spam, ever.
            </p>
        </form>
    );
}
