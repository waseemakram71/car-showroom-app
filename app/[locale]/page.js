'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CalendarDays, Check, ChevronDown, Clock3, Gauge, Instagram, Mail, MapPin, Menu, MessageCircle, Phone, Search, ShieldCheck, Sparkles, Star, Users, Wrench, X, Zap } from 'lucide-react'
import { cars as mockCars } from '@/lib/cars'
import { services } from '@/lib/services'
import { testimonials } from '@/lib/testimonials'
import { business } from '@/lib/config'
import useSWR from 'swr'
import { useTranslations, useLocale } from 'next-intl'

const fetcher = url => fetch(url).then(res => res.json())

const Button = ({ children, className = '', ...props }) => <button className={`inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${className}`} {...props}>{children}</button>

const CarCard = ({ car }) => {
  const tCommon = useTranslations('Common')
  const locale = useLocale()
  return <Link href={`/${locale}/inventory/${car.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:-translate-y-1 hover:border-primary/50"><div className="relative aspect-[4/3] overflow-hidden bg-muted"><img src={car.images[0]} alt={car.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur">{car.bodyType}</span><span className="absolute bottom-4 right-4 rounded-full bg-primary px-3 py-1 text-xs font-black text-primary-foreground">{car.price}</span></div><div className="p-5"><h3 className="font-display text-xl font-bold">{car.name}</h3><div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground"><span>{car.year}</span><span>{car.mileage}</span><span>{car.transmission}</span><span>{car.fuelType}</span></div><div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-bold"><span>{tCommon('viewDetails')}</span><ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" /></div></div></Link>
}

const InquiryForm = ({ service = false }) => { 
  const [sent, setSent] = useState(false); 
  const [loading, setLoading] = useState(false);
  const t = useTranslations('Home.Contact')
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.type = service ? 'service-booking' : 'contact';
    
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

  return sent ? <div className="rounded-2xl border border-primary/30 bg-primary/10 p-8 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground"><Check /></div><h3 className="mt-4 font-display text-2xl font-bold">{t('successTitle')}</h3><p className="mt-2 text-sm text-muted-foreground">{t('successSub')}</p></div> : <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2"><input required name="name" placeholder={t('name')} className="field" /><input required name="phone" placeholder={t('phone')} type="tel" className="field" />{service ? <><input required name="carModel" placeholder="Car model" className="field" /><select required name="subject" className="field" defaultValue=""><option value="" disabled>Service needed</option>{services.map((s) => <option key={s.id}>{s.title}</option>)}</select><input required name="dateNeeded" type="date" className="field" /><textarea name="message" placeholder="Tell us a little more" className="field min-h-28 sm:col-span-2" /></> : <><input type="email" name="email" placeholder={t('email')} className="field" /><input name="subject" placeholder={t('subject')} className="field" /><textarea required name="message" placeholder={t('message')} className="field min-h-28 sm:col-span-2" /></>}<Button type="submit" disabled={loading} className="sm:col-span-2">{loading ? t('sending') : service ? 'Book my service' : t('send')} <ArrowRight className="h-4 w-4" /></Button><p className="text-xs text-muted-foreground sm:col-span-2">{t('spam')}</p></form> 
}

export default function Home() { 
  const { data } = useSWR('/api/cars', fetcher)
  const cars = Array.isArray(data) ? data : []
  const featured = useMemo(() => cars.filter((c) => c.featured).slice(0, 3), [cars]); 
  const [currentSlide, setCurrentSlide] = useState(0);
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
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <>
      <main>
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
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
          <div className="container relative pb-20 pt-24 z-10">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[.25em] text-primary">
                <span className="h-px w-10 bg-primary" /> {t('Hero.trusted')}
              </p>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="font-display text-5xl font-black leading-[.95] tracking-tight sm:text-7xl lg:text-8xl">
                    {heroSlides[currentSlide].title}<br />
                    <span className="text-primary">{heroSlides[currentSlide].highlight}</span>
                  </h1>
                  <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={`/${locale}/inventory`} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground hover:bg-amber-300">
                  {t('Hero.browse')} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={`/${locale}/services`} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold hover:bg-white/10">
                  {t('Hero.book')} <Wrench className="h-4 w-4 text-primary" />
                </Link>
              </div>
              <div className="mt-12 flex gap-2">
                {heroSlides.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'}`} 
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-card border-y border-white/10 overflow-hidden flex w-full"><motion.div className="flex gap-4 pr-4 shrink-0" animate={{ x: ["0%", "-100%"] }} transition={{ ease: "linear", duration: 30, repeat: Infinity }}>{[['12+', t('Stats.years')], ['1,200+', t('Stats.sold')], ['4.9/5', t('Stats.rating')], ['24 hrs', t('Stats.turnaround')], ['50+', t('Stats.mechanics')], ['100%', t('Stats.verified')], ['7 Days', t('Stats.moneyBack')]].map(([value, label]) => <div key={label} className="w-[280px] flex shrink-0 flex-col items-center justify-center text-center px-6 py-10 rounded-3xl border border-white/10 bg-background shadow-lg transition-all hover:border-primary/50 hover:bg-white/5 hover:shadow-primary/20"><p className="font-display text-4xl font-black text-primary sm:text-5xl">{value}</p><p className="mt-3 text-sm text-muted-foreground font-medium uppercase tracking-wider">{label}</p></div>)}</motion.div><motion.div className="flex gap-4 pr-4 shrink-0" animate={{ x: ["0%", "-100%"] }} transition={{ ease: "linear", duration: 30, repeat: Infinity }}>{[['12+', t('Stats.years')], ['1,200+', t('Stats.sold')], ['4.9/5', t('Stats.rating')], ['24 hrs', t('Stats.turnaround')], ['50+', t('Stats.mechanics')], ['100%', t('Stats.verified')], ['7 Days', t('Stats.moneyBack')]].map(([value, label]) => <div key={label + '-dup'} className="w-[280px] flex shrink-0 flex-col items-center justify-center text-center px-6 py-10 rounded-3xl border border-white/10 bg-background shadow-lg transition-all hover:border-primary/50 hover:bg-white/5 hover:shadow-primary/20"><p className="font-display text-4xl font-black text-primary sm:text-5xl">{value}</p><p className="mt-3 text-sm text-muted-foreground font-medium uppercase tracking-wider">{label}</p></div>)}</motion.div></section><section className="container py-24"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">{t('Pillars.eyebrow')}</p><h2 className="section-title">{t('Pillars.title')}</h2></div><Link href={`/${locale}/services`} className="text-sm font-bold text-primary">{t('Pillars.seeAll')} <ArrowRight className="ml-1 inline h-4 w-4" /></Link></div><div className="mt-10 grid gap-4 md:grid-cols-3">{[['01', t('Pillars.buyTitle'), t('Pillars.buyText'), Gauge, `/${locale}/inventory`], ['02', t('Pillars.sellTitle'), t('Pillars.sellText'), Sparkles, `/${locale}/contact`], ['03', t('Pillars.repairTitle'), t('Pillars.repairText'), Wrench, `/${locale}/services`]].map(([n, title, text, Icon, href]) => <Link href={href} key={title} className="group rounded-2xl border border-white/10 bg-card p-7 transition hover:border-primary/60 hover:bg-white/[.04]"><div className="flex items-start justify-between"><span className="text-xs font-bold text-primary">{n}</span><Icon className="h-6 w-6 text-primary transition group-hover:rotate-12" /></div><h3 className="mt-12 font-display text-2xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">{tCommon('explore')} <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" /></span></Link>)}</div></section><section className="bg-card py-24"><div className="container"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">{t('Featured.eyebrow')}</p><h2 className="section-title">{t('Featured.title')}</h2></div><Link href={`/${locale}/inventory`} className="text-sm font-bold text-primary">{t('Featured.viewAll')} <ArrowRight className="ml-1 inline h-4 w-4" /></Link></div><div className="mt-10 grid gap-5 md:grid-cols-3">{featured.map((car) => <CarCard car={car} key={car.id} />)}</div></div></section><section className="container grid gap-12 py-24 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="eyebrow">{t('Why.eyebrow')}</p><h2 className="section-title">{t('Why.title')}</h2><p className="mt-5 max-w-md leading-7 text-muted-foreground">{t('Why.subtitle')}</p><div className="mt-8 space-y-5">{[[t('Why.transTitle'), t('Why.transText')], [t('Why.inspTitle'), t('Why.inspText')], [t('Why.genTitle'), t('Why.genText')], [t('Why.fastTitle'), t('Why.fastText')]].map(([title, text]) => <div key={title} className="flex gap-3"><div className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-3 w-3" /></div><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{text}</p></div></div>)}</div></div><div className="relative overflow-hidden rounded-3xl"><img src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1200&q=80" alt="Mechanic servicing a car engine" className="aspect-[4/3] w-full object-cover" /><div className="absolute bottom-5 left-5 rounded-xl border border-white/20 bg-background/80 p-4 backdrop-blur"><p className="font-display text-2xl font-bold text-primary">{t('Why.badge12')}</p><p className="text-xs text-muted-foreground">{t('Why.badgeRight')}</p></div></div></section><section className="bg-primary py-20 text-primary-foreground"><div className="container grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center"><div><p className="eyebrow text-primary-foreground/70">{t('Contact.eyebrow')}</p><h2 className="section-title">{t('Contact.title')}</h2><p className="mt-4 max-w-sm text-sm leading-6 text-primary-foreground/75">{t('Contact.subtitle')}</p></div><div className="rounded-2xl bg-background p-6 text-foreground sm:p-8"><InquiryForm /></div></div></section><section className="container py-24"><div className="mx-auto max-w-2xl text-center"><p className="eyebrow">{t('Testimonials.eyebrow')}</p><h2 className="section-title">{t('Testimonials.title')}</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{[0, 1, 2].map((i) => <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ y: -5 }} key={i} className="rounded-2xl border border-white/10 bg-card p-6 transition-colors hover:border-primary/50"><div className="flex gap-1 text-primary">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-current" />)}</div><p className="mt-5 text-sm leading-7 text-muted-foreground">“{t(`Testimonials.items.${i}.quote`)}”</p><div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5"><div className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-sm font-bold text-primary">{t(`Testimonials.items.${i}.name`)[0]}</div><div><p className="text-sm font-bold">{t(`Testimonials.items.${i}.name`)}</p><p className="text-xs text-muted-foreground">{t(`Testimonials.items.${i}.role`)}</p></div></div></motion.div>)}</div></section>
      </main>
    </>
  )
}