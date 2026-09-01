import Link from 'next/link'
import { ArrowRight, BatteryCharging, Check, Droplets, ShieldCheck, Sparkles, Wind, Wrench, Zap } from 'lucide-react'
import prisma from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'

const icons = { Zap, Wind, Sparkles, Droplets, BatteryCharging, ShieldCheck }

export default async function ServicesPage({ params }) { 
  const services = await prisma.service.findMany({ orderBy: { createdAt: 'desc' } })
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Services' })
  
  return <main className="min-h-screen pb-24 pt-28"><div className="container"><Link href={`/${locale}`} className="text-sm font-bold text-primary">{t('back')}</Link><div className="mt-12 max-w-2xl"><p className="eyebrow">{t('eyebrow')}</p><h1 className="section-title">{t('title')}</h1><p className="mt-5 leading-7 text-muted-foreground">{t('subtitle')}</p></div><div className="mt-12 grid gap-4 md:grid-cols-3">{services.map((service) => { const Icon = icons[service.icon] || Wrench; return <div key={service.id} className="rounded-2xl border border-border bg-card p-7"><Icon className="h-7 w-7 text-primary" /><h2 className="mt-10 font-display text-2xl font-bold">{service.title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p></div> })}</div>{services.length === 0 && <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">{t('empty')}</div>}<div className="mt-16 rounded-3xl bg-primary p-7 text-primary-foreground sm:p-12"><div className="grid gap-10 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-primary-foreground/70">{t('bookEyebrow')}</p><h2 className="mt-3 font-display text-4xl font-bold">{t('bookTitle')}</h2><p className="mt-4 text-sm leading-6 text-primary-foreground/75">{t('bookSub')}</p></div><Link href={`/${locale}/contact?service=true`} className="inline-flex h-fit items-center justify-center gap-2 self-end rounded-full bg-background px-6 py-4 text-sm font-bold text-foreground transition hover:bg-white hover:text-black hover:scale-105">{t('bookBtn')} <ArrowRight className="h-4 w-4" /></Link></div></div></div></main> 
}