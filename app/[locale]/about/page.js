import Link from 'next/link'
import { Check, Users, Wrench } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

export default function AboutPage() { 
  const t = useTranslations('AboutPage');
  const locale = useLocale();
  
  return <main className="min-h-screen pb-24 pt-28"><div className="container"><Link href={`/${locale}`} className="text-sm font-bold text-primary">{t('back')}</Link><div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center"><div><p className="eyebrow">{t('eyebrow')}</p><h1 className="section-title" dangerouslySetInnerHTML={{ __html: t.raw('title') }}></h1><p className="mt-6 leading-8 text-muted-foreground">{t('p1')}</p><p className="mt-4 leading-8 text-muted-foreground">{t('p2')}</p></div><img src="https://images.unsplash.com/photo-1601026968712-b86b9329019f?auto=format&fit=crop&w=1200&q=80" alt="FAM AutoMobile showroom" className="aspect-[4/3] rounded-3xl object-cover" /></div><div className="mt-16 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-border bg-card p-6"><Users className="text-primary" /><p className="mt-8 font-display text-2xl font-bold">{t('feat1Title')}</p><p className="mt-2 text-sm text-muted-foreground">{t('feat1Text')}</p></div><div className="rounded-2xl border border-border bg-card p-6"><Wrench className="text-primary" /><p className="mt-8 font-display text-2xl font-bold">{t('feat2Title')}</p><p className="mt-2 text-sm text-muted-foreground">{t('feat2Text')}</p></div><div className="rounded-2xl border border-border bg-card p-6"><Check className="text-primary" /><p className="mt-8 font-display text-2xl font-bold">{t('feat3Title')}</p><p className="mt-2 text-sm text-muted-foreground">{t('feat3Text')}</p></div></div></div></main> 
}