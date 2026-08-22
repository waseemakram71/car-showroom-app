'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CalendarDays, Check, ChevronDown, Clock3, Gauge, Instagram, Mail, MapPin, Menu, MessageCircle, Phone, Search, ShieldCheck, Sparkles, Star, Users, Wrench, X, Zap } from 'lucide-react'
import { cars } from '@/lib/cars'
import { services } from '@/lib/services'
import { testimonials } from '@/lib/testimonials'
import { business } from '@/lib/config'

const nav = [['Inventory', '/inventory'], ['Services', '/services'], ['About us', '/about'], ['Contact', '/contact']]

const Button = ({ children, className = '', ...props }) => <button className={`inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${className}`} {...props}>{children}</button>

const SiteNav = () => {
  const [open, setOpen] = useState(false)
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/85 backdrop-blur-xl">
    <div className="container flex h-20 items-center justify-between">
      <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-xl font-black text-primary-foreground">F</span><span className="font-display text-xl font-bold tracking-tight">FAM <span className="text-primary">AutoMobile</span></span></Link>
      <nav className="hidden items-center gap-8 md:flex">{nav.map(([label, href]) => <Link key={href} href={href} className="text-sm font-medium text-muted-foreground transition hover:text-foreground">{label}</Link>)}<Link href="/contact" className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-amber-300">Book a visit <ArrowRight className="ml-2 inline h-4 w-4" /></Link></nav>
      <button className="rounded-lg p-2 text-foreground md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="container border-t border-white/10 pb-5 pt-3 md:hidden">{nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 text-sm font-semibold">{label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)} className="mt-4 block rounded-full bg-primary px-5 py-3 text-center text-sm font-bold text-primary-foreground">Book a visit</Link></nav>}
  </header>
}

const Footer = () => <footer className="border-t border-white/10 bg-black/20"><div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]"><div><Link href="/" className="font-display text-2xl font-bold">FAM <span className="text-primary">AutoMobile</span></Link><p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">Fair-price car dealing and honest workshop service, all under one roof.</p><div className="mt-5 flex gap-3"><a href={business.instagram} aria-label="Instagram" className="rounded-full border border-white/10 p-2 text-muted-foreground hover:text-primary"><Instagram className="h-4 w-4" /></a><a href={business.whatsappLink} aria-label="WhatsApp" className="rounded-full border border-white/10 p-2 text-muted-foreground hover:text-primary"><MessageCircle className="h-4 w-4" /></a></div></div><div><p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-primary">Explore</p>{nav.slice(0, 3).map(([label, href]) => <Link key={href} href={href} className="mb-3 block text-sm text-muted-foreground hover:text-foreground">{label}</Link>)}</div><div><p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-primary">Visit us</p><p className="flex gap-2 text-sm leading-6 text-muted-foreground"><MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />{business.address}</p><p className="mt-3 flex gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4 text-primary" />{business.phone}</p></div><div><p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-primary">Opening hours</p><p className="text-sm leading-7 text-muted-foreground">Mon — Sat: 9:00 AM — 8:00 PM<br />Sunday: 11:00 AM — 5:00 PM</p><Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-amber-300">Get directions <ArrowRight className="h-4 w-4" /></Link></div></div><div className="container border-t border-white/10 py-5 text-xs text-muted-foreground">© 2026 FAM AutoMobile. Built on trust, driven by care.</div></footer>

const WhatsApp = () => <a href={business.whatsappLink} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-5 font-bold text-white shadow-2xl shadow-[#25D366]/20 transition hover:scale-105 hover:bg-[#20ba59]"><MessageCircle className="h-6 w-6" /><span>Chat with us</span></a>

const CarCard = ({ car }) => <Link href={`/inventory/${car.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:-translate-y-1 hover:border-primary/50"><div className="relative aspect-[4/3] overflow-hidden bg-muted"><img src={car.images[0]} alt={car.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur">{car.bodyType}</span><span className="absolute bottom-4 right-4 rounded-full bg-primary px-3 py-1 text-xs font-black text-primary-foreground">{car.price}</span></div><div className="p-5"><h3 className="font-display text-xl font-bold">{car.name}</h3><div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground"><span>{car.year}</span><span>{car.mileage}</span><span>{car.transmission}</span><span>{car.fuelType}</span></div><div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-bold"><span>View details</span><ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" /></div></div></Link>

const InquiryForm = ({ service = false }) => { const [sent, setSent] = useState(false); return sent ? <div className="rounded-2xl border border-primary/30 bg-primary/10 p-8 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground"><Check /></div><h3 className="mt-4 font-display text-2xl font-bold">Message received, thank you.</h3><p className="mt-2 text-sm text-muted-foreground">Our team will get back to you shortly. You can also reach us instantly on WhatsApp.</p></div> : <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="grid gap-4 sm:grid-cols-2"><input required placeholder="Your name" className="field" /><input required placeholder="Phone number" type="tel" className="field" />{service ? <><input required placeholder="Car model" className="field" /><select required className="field" defaultValue=""><option value="" disabled>Service needed</option>{services.map((s) => <option key={s.id}>{s.title}</option>)}</select><input required type="date" className="field" /><textarea placeholder="Tell us a little more" className="field min-h-28 sm:col-span-2" /></> : <><input type="email" placeholder="Email address" className="field" /><input placeholder="Subject" className="field" /><textarea required placeholder="How can we help?" className="field min-h-28 sm:col-span-2" /></>}<Button type="submit" className="sm:col-span-2">{service ? 'Book my service' : 'Send enquiry'} <ArrowRight className="h-4 w-4" /></Button><p className="text-xs text-muted-foreground sm:col-span-2">We respect your time. No spam, just a helpful reply from FAM.</p></form> }

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1647200527435-cc6b0e91e120?auto=format&fit=crop&w=2200&q=85",
    title: "Your next car.",
    highlight: "Handled right.",
    subtitle: "Buy with confidence, sell without the hassle, and keep your car running at its best — all at one honest, dependable destination."
  },
  {
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=2200&q=85",
    title: "Premium rides.",
    highlight: "Unmatched quality.",
    subtitle: "Explore our curated collection of luxury and performance vehicles tailored for your lifestyle."
  },
  {
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2200&q=85",
    title: "Expert service.",
    highlight: "Guaranteed.",
    subtitle: "Our certified mechanics ensure your vehicle stays in peak condition with our comprehensive care."
  }
];

export default function Home() { 
  const featured = useMemo(() => cars.filter((c) => c.featured).slice(0, 3), []); 
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <SiteNav />
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
                <span className="h-px w-10 bg-primary" /> Karachi&apos;s trusted auto house
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
                <Link href="/inventory" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground hover:bg-amber-300">
                  Browse inventory <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold hover:bg-white/10">
                  Book a service <Wrench className="h-4 w-4 text-primary" />
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
        
        <section className="py-12 bg-card border-y border-white/10 overflow-hidden flex w-full"><motion.div className="flex gap-4 pr-4 shrink-0" animate={{ x: ["0%", "-100%"] }} transition={{ ease: "linear", duration: 30, repeat: Infinity }}>{[['12+', 'Years in business'], ['1,200+', 'Cars sold'], ['4.9/5', 'Customer rating'], ['24 hrs', 'Avg. turnaround'], ['50+', 'Expert mechanics'], ['100%', 'Verified cars'], ['7 Days', 'Money-back']].map(([value, label]) => <div key={label} className="w-[280px] flex shrink-0 flex-col items-center justify-center text-center px-6 py-10 rounded-3xl border border-white/10 bg-background shadow-lg transition-all hover:border-primary/50 hover:bg-white/5 hover:shadow-primary/20"><p className="font-display text-4xl font-black text-primary sm:text-5xl">{value}</p><p className="mt-3 text-sm text-muted-foreground font-medium uppercase tracking-wider">{label}</p></div>)}</motion.div><motion.div className="flex gap-4 pr-4 shrink-0" animate={{ x: ["0%", "-100%"] }} transition={{ ease: "linear", duration: 30, repeat: Infinity }}>{[['12+', 'Years in business'], ['1,200+', 'Cars sold'], ['4.9/5', 'Customer rating'], ['24 hrs', 'Avg. turnaround'], ['50+', 'Expert mechanics'], ['100%', 'Verified cars'], ['7 Days', 'Money-back']].map(([value, label]) => <div key={label + '-dup'} className="w-[280px] flex shrink-0 flex-col items-center justify-center text-center px-6 py-10 rounded-3xl border border-white/10 bg-background shadow-lg transition-all hover:border-primary/50 hover:bg-white/5 hover:shadow-primary/20"><p className="font-display text-4xl font-black text-primary sm:text-5xl">{value}</p><p className="mt-3 text-sm text-muted-foreground font-medium uppercase tracking-wider">{label}</p></div>)}</motion.div></section><section className="container py-24"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">Everything under one roof</p><h2 className="section-title">Move with confidence.</h2></div><Link href="/services" className="text-sm font-bold text-primary">See all services <ArrowRight className="ml-1 inline h-4 w-4" /></Link></div><div className="mt-10 grid gap-4 md:grid-cols-3">{[['01', 'Buy a car', 'A carefully selected range of inspected cars, with clear prices and zero pressure.', Gauge, '/inventory'], ['02', 'Sell your car', 'A fair valuation, fast paperwork, and a straightforward offer you can trust.', Sparkles, '/contact'], ['03', 'Repair & service', 'From a routine oil change to complex diagnostics, our workshop has you covered.', Wrench, '/services']].map(([n, title, text, Icon, href]) => <Link href={href} key={title} className="group rounded-2xl border border-white/10 bg-card p-7 transition hover:border-primary/60 hover:bg-white/[.04]"><div className="flex items-start justify-between"><span className="text-xs font-bold text-primary">{n}</span><Icon className="h-6 w-6 text-primary transition group-hover:rotate-12" /></div><h3 className="mt-12 font-display text-2xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">Explore <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" /></span></Link>)}</div></section><section className="bg-card py-24"><div className="container"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">Ready for the road</p><h2 className="section-title">Featured inventory.</h2></div><Link href="/inventory" className="text-sm font-bold text-primary">View all cars <ArrowRight className="ml-1 inline h-4 w-4" /></Link></div><div className="mt-10 grid gap-5 md:grid-cols-3">{featured.map((car) => <CarCard car={car} key={car.id} />)}</div></div></section><section className="container grid gap-12 py-24 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="eyebrow">Why FAM</p><h2 className="section-title">The way car care should feel.</h2><p className="mt-5 max-w-md leading-7 text-muted-foreground">No jargon, no shortcuts, no surprises. Just solid cars and skilled people who take pride in doing things properly.</p><div className="mt-8 space-y-5">{[['Transparent pricing', 'Know exactly what you are paying for.'], ['Inspected cars', 'Every car earns its place on our floor.'], ['Genuine parts', 'Quality components for lasting peace of mind.'], ['Fast turnaround', 'Your time matters as much as your car.']].map(([title, text]) => <div key={title} className="flex gap-3"><div className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-3 w-3" /></div><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{text}</p></div></div>)}</div></div><div className="relative overflow-hidden rounded-3xl"><img src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1200&q=80" alt="Mechanic servicing a car engine" className="aspect-[4/3] w-full object-cover" /><div className="absolute bottom-5 left-5 rounded-xl border border-white/20 bg-background/80 p-4 backdrop-blur"><p className="font-display text-2xl font-bold text-primary">12 years</p><p className="text-xs text-muted-foreground">of doing it right</p></div></div></section><section className="bg-primary py-20 text-primary-foreground"><div className="container grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center"><div><p className="eyebrow text-primary-foreground/70">Say hello</p><h2 className="section-title">Let&apos;s get you moving.</h2><p className="mt-4 max-w-sm text-sm leading-6 text-primary-foreground/75">Have a car in mind or need a second opinion? Tell us what you need.</p></div><div className="rounded-2xl bg-background p-6 text-foreground sm:p-8"><InquiryForm /></div></div></section><section className="container py-24"><div className="mx-auto max-w-2xl text-center"><p className="eyebrow">Real words from real drivers</p><h2 className="section-title">Good cars. Better people.</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{testimonials.map((t, index) => <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -5 }} key={t.name} className="rounded-2xl border border-white/10 bg-card p-6 transition-colors hover:border-primary/50"><div className="flex gap-1 text-primary">{[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div><p className="mt-5 text-sm leading-7 text-muted-foreground">“{t.quote}”</p><div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5"><div className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-sm font-bold text-primary">{t.name[0]}</div><div><p className="text-sm font-bold">{t.name}</p><p className="text-xs text-muted-foreground">{t.role}</p></div></div></motion.div>)}</div></section>
      </main>
      <WhatsApp />
      <Footer />
    </>
  )
}