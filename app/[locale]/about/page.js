import Link from 'next/link'
import { Check, Users, Wrench, ArrowLeft } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

export default function AboutPage() { 
  const t = useTranslations('AboutPage');
  const locale = useLocale();
  
  return (
    <main className="min-h-screen pb-24 pt-24">
      <div className="container">
        <Link 
          href={`/${locale}`} 
          className="inline-flex items-center gap-2 text-sm font-bold text-[#B8C3CA] hover:text-[#FFFFFF] transition"
        >
          <ArrowLeft className="h-4 w-4" /> {t('back')}
        </Link>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">{t('eyebrow')}</p>
            <h1 className="section-title" dangerouslySetInnerHTML={{ __html: t.raw('title') }}></h1>
            <p className="mt-6 leading-8 text-[#B8C3CA]">{t('p1')}</p>
            <p className="mt-4 leading-8 text-[#B8C3CA]">{t('p2')}</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1601026968712-b86b9329019f?auto=format&fit=crop&w=1200&q=80" 
            alt="FAM AutoMobile showroom" 
            className="aspect-[4/3] rounded-3xl object-cover shadow-2xl" 
          />
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl p-6 transition" style={{ background: 'linear-gradient(145deg, #0D2D40 0%, rgba(13, 45, 64, 0.4) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="inline-flex rounded-xl p-3" style={{ background: '#FFFFFF', color: '#071D2B' }}>
              <Users className="h-6 w-6" />
            </div>
            <p className="mt-8 font-display text-2xl font-bold text-[#FFFFFF]">{t('feat1Title')}</p>
            <p className="mt-2 text-sm text-[#B8C3CA]">{t('feat1Text')}</p>
          </div>
          <div className="rounded-2xl p-6 transition" style={{ background: 'linear-gradient(145deg, #0D2D40 0%, rgba(13, 45, 64, 0.4) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="inline-flex rounded-xl p-3" style={{ background: '#FFFFFF', color: '#071D2B' }}>
              <Wrench className="h-6 w-6" />
            </div>
            <p className="mt-8 font-display text-2xl font-bold text-[#FFFFFF]">{t('feat2Title')}</p>
            <p className="mt-2 text-sm text-[#B8C3CA]">{t('feat2Text')}</p>
          </div>
          <div className="rounded-2xl p-6 transition" style={{ background: 'linear-gradient(145deg, #0D2D40 0%, rgba(13, 45, 64, 0.4) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="inline-flex rounded-xl p-3" style={{ background: '#FFFFFF', color: '#071D2B' }}>
              <Check className="h-6 w-6" />
            </div>
            <p className="mt-8 font-display text-2xl font-bold text-[#FFFFFF]">{t('feat3Title')}</p>
            <p className="mt-2 text-sm text-[#B8C3CA]">{t('feat3Text')}</p>
          </div>
        </div>
      </div>
    </main>
  )
}