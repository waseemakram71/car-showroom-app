'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Gauge, Sparkles, Star, Wrench } from 'lucide-react'
import { cars as mockCars } from '@/lib/cars'
import { services } from '@/lib/services'
import { testimonials } from '@/lib/testimonials'
import { business } from '@/lib/config'
import useSWR from 'swr'
import { useTranslations, useLocale } from 'next-intl'
import { CarCard, CarCardSkeleton } from '@/components/CarCard'

const fetcher = url => fetch(url).then(res => res.json())

const InquiryForm = ({ service = false }) => {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const t = useTranslations('Home.Contact')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    data.type = service ? 'service-booking' : 'contact'
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      setSent(true)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return sent ? (
    <div className="rounded-2xl border p-8 text-center"
      style={{ borderColor: 'rgba(7,29,43,0.2)', background: 'rgba(7,29,43,0.06)' }}>
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full"
        style={{ background: '#071D2B', color: '#F7F8F8' }}>
        <Check />
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold" style={{ color: '#091C29' }}>{t('successTitle')}</h3>
      <p className="mt-2 text-sm" style={{ color: '#63717C' }}>{t('successSub')}</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <input required name="name" placeholder={t('name')} className="field" />
      <input required name="phone" placeholder={t('phone')} type="tel" className="field" />
      {service ? (
        <>
          <input required name="carModel" placeholder="Car model" className="field" />
          <select required name="subject" className="field" defaultValue="">
            <option value="" disabled>Service needed</option>
            {services.map((s) => <option key={s.id}>{s.title}</option>)}
          </select>
          <input required name="dateNeeded" type="date" className="field" />
          <textarea name="message" placeholder="Tell us a little more" className="field min-h-28 sm:col-span-2" />
        </>
      ) : (
        <>
          <input type="email" name="email" placeholder={t('email')} className="field" />
          <input name="subject" placeholder={t('subject')} className="field" />
          <textarea required name="message" placeholder={t('message')} className="field min-h-28 sm:col-span-2" />
        </>
      )}
      <button
        type="submit"
        disabled={loading}
        className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition disabled:opacity-60"
        style={{ background: '#071D2B', color: '#F7F8F8' }}
        onMouseEnter={e => e.currentTarget.style.background = '#0D2D40'}
        onMouseLeave={e => e.currentTarget.style.background = '#071D2B'}
      >
        {loading ? t('sending') : service ? 'Book my service' : t('send')} <ArrowRight className="h-4 w-4" />
      </button>
      <p className="text-xs sm:col-span-2" style={{ color: '#63717C' }}>{t('spam')}</p>
    </form>
  )
}

export default function Home() {
  const { data, isLoading } = useSWR('/api/cars', fetcher)
  const cars = Array.isArray(data) ? data : []
  const featured = useMemo(() => cars.filter((c) => c.featured).slice(0, 3), [cars])
  const [currentSlide, setCurrentSlide] = useState(0)
  const t = useTranslations('Home')
  const tCommon = useTranslations('Common')
  const locale = useLocale()

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1647200527435-cc6b0e91e120?auto=format&fit=crop&w=2200&q=85",
      title: t('Hero.slide1Title'),
      highlight: t('Hero.slide1Highlight'),
      subtitle: t('Hero.slide1Sub')
    },
    {
      image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=2200&q=85",
      title: t('Hero.slide2Title'),
      highlight: t('Hero.slide2Highlight'),
      subtitle: t('Hero.slide2Sub')
    },
    {
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2200&q=85",
      title: t('Hero.slide3Title'),
      highlight: t('Hero.slide3Highlight'),
      subtitle: t('Hero.slide3Sub')
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  return (
    <>
      <main>
        {/* ── Hero ── */}
        <section className="relative flex min-h-[720px] items-end overflow-hidden pt-20">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={heroSlides[currentSlide].image}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              alt="Showroom car"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgba(7,29,43,0.70) 0%, rgba(7,29,43,0.40) 45%, rgba(7,29,43,0.05) 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(7,29,43,0.60) 0%, transparent 40%)' }} />
          <div className="container relative pb-20 pt-24 z-10">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[.25em]"
                style={{ color: '#DCE2E6' }}>
                <span className="h-px w-10" style={{ background: '#DCE2E6' }} /> {t('Hero.trusted')}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl lg:text-8xl"
                    style={{ color: '#FFFFFF' }}>
                    {heroSlides[currentSlide].title}<br />
                    <span style={{ color: '#F7F8F8', opacity: 0.85 }}>{heroSlides[currentSlide].highlight}</span>
                  </h1>
                  <p className="mt-7 max-w-xl text-base leading-7 sm:text-lg" style={{ color: '#DCE2E6' }}>
                    {heroSlides[currentSlide].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-9 flex flex-wrap gap-3">
                {/* Primary CTA — white on navy */}
                <Link
                  href={`/${locale}/inventory`}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm font-bold transition"
                  style={{ background: '#F7F8F8', color: '#071D2B' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#DCE2E6'}
                  onMouseLeave={e => e.currentTarget.style.background = '#F7F8F8'}
                >
                  {t('Hero.browse')} <ArrowRight className="h-4 w-4" />
                </Link>
                {/* Secondary CTA — outlined white */}
                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm font-bold transition"
                  style={{ background: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.40)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.10)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {t('Hero.book')} <Wrench className="h-4 w-4" style={{ color: '#DCE2E6' }} />
                </Link>
              </div>
              {/* Carousel indicators */}
              <div className="mt-12 flex gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: i === currentSlide ? '2rem' : '0.5rem',
                      background: i === currentSlide ? '#F7F8F8' : 'rgba(255,255,255,0.30)'
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Ticker ── */}
        <section className="py-12 border-y overflow-hidden flex w-full group"
          style={{ background: '#FFFFFF', borderColor: '#DCE2E6' }}>
          {[0, 1].map((dup) => (
            <div
              key={dup}
              className="flex gap-4 pr-4 shrink-0 animate-marquee"
            >
              {[['12+', t('Stats.years')], ['1,200+', t('Stats.sold')], ['4.9/5', t('Stats.rating')], ['24 hrs', t('Stats.turnaround')], ['50+', t('Stats.mechanics')], ['100%', t('Stats.verified')], ['7 Days', t('Stats.moneyBack')]].map(([value, label]) => (
                <div key={label + dup}
                  className="w-[280px] flex shrink-0 flex-col items-center justify-center text-center px-6 py-10 rounded-3xl transition-all"
                  style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 24px rgba(7,29,43,0.12)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                >
                  <p className="font-display text-4xl font-black sm:text-5xl" style={{ color: '#FFFFFF' }}>{value}</p>
                  <p className="mt-3 text-sm font-medium uppercase tracking-wider" style={{ color: '#B8C3CA' }}>{label}</p>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* ── Service Pillars ── */}
        <section className="py-24" style={{ background: '#F8F7F4' }}>
          <div className="container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">{t('Pillars.eyebrow')}</p>
              <h2 className="section-title" style={{ color: '#091C29' }}>{t('Pillars.title')}</h2>
            </div>
            <Link href={`/${locale}/services`} className="text-sm font-bold transition" style={{ color: '#071D2B' }}
              onMouseEnter={e => e.currentTarget.style.color = '#0D2D40'}
              onMouseLeave={e => e.currentTarget.style.color = '#071D2B'}>
              {t('Pillars.seeAll')} <ArrowRight className="ml-1 inline h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ['01', t('Pillars.buyTitle'), t('Pillars.buyText'), Gauge, `/${locale}/inventory`],
              ['02', t('Pillars.sellTitle'), t('Pillars.sellText'), Sparkles, `/${locale}/contact`],
              ['03', t('Pillars.repairTitle'), t('Pillars.repairText'), Wrench, `/${locale}/services`]
            ].map(([n, title, text, Icon, href]) => (
              <Link href={href} key={title}
                className="group rounded-2xl border p-7 transition"
                style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)', borderColor: 'rgba(255,255,255,0.08)', boxShadow: '0 4px 12px rgba(7,29,43,0.12)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(7,29,43,0.25)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(7,29,43,0.12)' }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold" style={{ color: '#FFFFFF' }}>{n}</span>
                  <Icon className="h-6 w-6 transition group-hover:rotate-12" style={{ color: '#FFFFFF' }} />
                </div>
                <h3 className="mt-12 font-display text-2xl font-bold" style={{ color: '#FFFFFF' }}>{title}</h3>
                <p className="mt-3 text-sm leading-6" style={{ color: '#B8C3CA' }}>{text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#FFFFFF' }}>
                  {tCommon('explore')} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          </div>
        </section>

        {/* ── Featured Inventory ── */}
        <section className="py-24" style={{ background: '#071D2B' }}>
          <div className="container">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow" style={{ color: '#B8C3CA' }}>{t('Featured.eyebrow')}</p>
                <h2 className="section-title" style={{ color: '#FFFFFF' }}>{t('Featured.title')}</h2>
              </div>
              <Link href={`/${locale}/inventory`} className="text-sm font-bold transition" style={{ color: '#F7F8F8' }}
                onMouseEnter={e => e.currentTarget.style.color = '#B8C3CA'}
                onMouseLeave={e => e.currentTarget.style.color = '#F7F8F8'}>
                {t('Featured.viewAll')} <ArrowRight className="ml-1 inline h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {isLoading 
                ? [1, 2, 3].map((i) => <CarCardSkeleton key={i} />) 
                : featured.map((car) => <CarCard car={car} key={car.id} />)}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-24" style={{ background: '#FFFFFF' }}>
          <div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">{t('Why.eyebrow')}</p>
            <h2 className="section-title" style={{ color: '#091C29' }}>{t('Why.title')}</h2>
            <p className="mt-5 max-w-md leading-7" style={{ color: '#63717C' }}>{t('Why.subtitle')}</p>
            <div className="mt-8 space-y-5">
              {[
                [t('Why.transTitle'), t('Why.transText')],
                [t('Why.inspTitle'), t('Why.inspText')],
                [t('Why.genTitle'), t('Why.genText')],
                [t('Why.fastTitle'), t('Why.fastText')]
              ].map(([title, text]) => (
                <div key={title} className="flex gap-3">
                  <div className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                    style={{ background: '#071D2B', color: '#F7F8F8' }}>
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <h3 className="font-bold" style={{ color: '#091C29' }}>{title}</h3>
                    <p className="mt-1 text-sm" style={{ color: '#63717C' }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl">
            <img src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1200&q=80"
              alt="Mechanic servicing a car engine" className="aspect-[4/3] w-full object-cover" />
            <div className="absolute bottom-5 left-5 rounded-xl border p-4 backdrop-blur"
              style={{ background: 'rgba(7,29,43,0.82)', borderColor: 'rgba(255,255,255,0.15)' }}>
              <p className="font-display text-2xl font-bold" style={{ color: '#F7F8F8' }}>{t('Why.badge12')}</p>
              <p className="text-xs" style={{ color: '#B8C3CA' }}>{t('Why.badgeRight')}</p>
            </div>
          </div>
          </div>
        </section>

        {/* ── Contact CTA ── */}
        <section className="py-20" style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)' }}>
          <div className="container grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.25em]" style={{ color: '#B8C3CA' }}>
                {t('Contact.eyebrow')}
              </p>
              <h2 className="section-title" style={{ color: '#FFFFFF' }}>{t('Contact.title')}</h2>
              <p className="mt-4 max-w-sm text-sm leading-6" style={{ color: '#B8C3CA' }}>{t('Contact.subtitle')}</p>
            </div>
            <div className="rounded-2xl p-6 sm:p-8" style={{ background: '#FFFFFF' }}>
              <InquiryForm />
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-24" style={{ background: '#F8F7F4' }}>
          <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{t('Testimonials.eyebrow')}</p>
            <h2 className="section-title" style={{ color: '#091C29' }}>{t('Testimonials.title')}</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border p-6 transition-all"
                style={{ background: '#FFFFFF', borderColor: '#DCE2E6', boxShadow: '0 4px 12px rgba(7,29,43,0.04)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#071D2B'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(7,29,43,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#DCE2E6'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(7,29,43,0.04)' }}
              >
                <div className="flex gap-1" style={{ color: '#071D2B' }}>
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-5 text-sm leading-7" style={{ color: '#63717C' }}>
                  "{t(`Testimonials.items.${i}.quote`)}"
                </p>
                <div className="mt-6 flex items-center gap-3 border-t pt-5" style={{ borderColor: '#DCE2E6' }}>
                  <div className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold"
                    style={{ background: '#071D2B', color: '#F7F8F8' }}>
                    {t(`Testimonials.items.${i}.name`)[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#091C29' }}>{t(`Testimonials.items.${i}.name`)}</p>
                    <p className="text-xs" style={{ color: '#63717C' }}>{t(`Testimonials.items.${i}.role`)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          </div>
        </section>
      </main>
    </>
  )
}