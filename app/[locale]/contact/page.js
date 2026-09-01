'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Check, Clock3, Mail, MapPin, Phone } from 'lucide-react'
import { business } from '@/lib/config'
import { useTranslations, useLocale } from 'next-intl'

export default function ContactPage() { 
  const [sent, setSent] = useState(false); 
  const [loading, setLoading] = useState(false);
  const t = useTranslations('ContactPage');
  const locale = useLocale();
  
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

  return <main className="min-h-screen pb-24 pt-28"><div className="container"><Link href={`/${locale}`} className="text-sm font-bold text-primary">{t('back')}</Link><div className="mt-12 grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow">{t('eyebrow')}</p><h1 className="section-title">{t('title')}</h1><p className="mt-5 leading-7 text-muted-foreground">{t('subtitle')}</p><div className="mt-10 space-y-6 text-sm"><p className="flex gap-4"><MapPin className="h-5 w-5 text-primary" /><span>{business.address}</span></p><p className="flex gap-4"><Phone className="h-5 w-5 text-primary" /><span>{business.phone}</span></p><p className="flex gap-4"><Clock3 className="h-5 w-5 text-primary" /><span>{t('monSat')}<br />{t('sunday')}</span></p></div></div><div className="rounded-3xl border border-border bg-card p-6 sm:p-9">{sent ? <div className="py-16 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground"><Check /></div><h2 className="mt-5 font-display text-3xl font-bold">{t('successTitle')}</h2><p className="mt-2 text-sm text-muted-foreground">{t('successSub')}</p></div> : <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2"><input required name="name" placeholder={t('name')} className="field" /><input required name="phone" type="tel" placeholder={t('phone')} className="field" /><input type="email" name="email" placeholder={t('email')} className="field" /><input required name="subject" placeholder={t('subject')} className="field" /><textarea required name="message" placeholder={t('message')} className="field min-h-36 sm:col-span-2" /><button disabled={loading} className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground sm:col-span-2 disabled:opacity-50">{loading ? t('sending') : t('send')}</button></form>}</div></div></div></main> 
}