'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Check, Clock3, Mail, MapPin, Phone } from 'lucide-react'
import { business } from '@/lib/config'
export default function ContactPage() { 
  const [sent, setSent] = useState(false); 
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.type = 'contact';
    
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return <main className="min-h-screen pb-24 pt-28"><div className="container"><Link href="/" className="text-sm font-bold text-primary">← FAM AutoMobile</Link><div className="mt-12 grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow">Come say hello</p><h1 className="section-title">Let’s talk cars.</h1><p className="mt-5 leading-7 text-muted-foreground">Whether you want to buy, sell, repair, or simply ask a question, our team is ready.</p><div className="mt-10 space-y-6 text-sm"><p className="flex gap-4"><MapPin className="h-5 w-5 text-primary" /><span>{business.address}</span></p><p className="flex gap-4"><Phone className="h-5 w-5 text-primary" /><span>{business.phone}</span></p><p className="flex gap-4"><Clock3 className="h-5 w-5 text-primary" /><span>Mon–Sat: 9 AM–8 PM<br />Sun: 11 AM–5 PM</span></p></div></div><div className="rounded-3xl border border-border bg-card p-6 sm:p-9">{sent ? <div className="py-16 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground"><Check /></div><h2 className="mt-5 font-display text-3xl font-bold">We’ll be in touch.</h2><p className="mt-2 text-sm text-muted-foreground">Thanks for reaching out to FAM AutoMobile.</p></div> : <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2"><input required name="name" placeholder="Your name" className="field" /><input required name="phone" type="tel" placeholder="Phone number" className="field" /><input type="email" name="email" placeholder="Email address" className="field" /><input required name="subject" placeholder="Subject" className="field" /><textarea required name="message" placeholder="Your message" className="field min-h-36 sm:col-span-2" /><button disabled={loading} className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground sm:col-span-2 disabled:opacity-50">{loading ? 'Sending...' : 'Send message'}</button></form>}</div></div></div></main> 
}