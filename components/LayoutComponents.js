'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Instagram, MessageCircle, MapPin, Phone, X, Menu } from 'lucide-react'
import { business } from '@/lib/config'

export const nav = [['Inventory', '/inventory'], ['Services', '/services'], ['About us', '/about'], ['Contact', '/contact']]

export const SiteNav = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/85 backdrop-blur-xl">
    <div className="container flex h-20 items-center justify-between">
      <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-xl font-black text-primary-foreground">F</span><span className="font-display text-xl font-bold tracking-tight">FAM <span className="text-primary">AutoMobile</span></span></Link>
      <nav className="hidden items-center gap-2 md:flex">
        {nav.map(([label, href]) => {
          const isActive = pathname === href || (href !== '/' && pathname?.startsWith(`${href}/`))
          return (
            <Link key={href} href={href} className={`px-4 py-2 rounded-full text-sm font-medium transition ${isActive ? 'bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20' : 'bg-white/5 text-foreground hover:bg-white/15'}`}>
              {label}
            </Link>
          )
        })}
        <div className="ml-4"><Link href="/contact" className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-amber-300 shadow-lg shadow-primary/20">Book a visit <ArrowRight className="ml-2 inline h-4 w-4" /></Link></div>
      </nav>
      <button className="rounded-lg p-2 text-foreground md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="container border-t border-white/10 pb-5 pt-3 md:hidden">
      {nav.map(([label, href]) => {
        const isActive = pathname === href || (href !== '/' && pathname?.startsWith(`${href}/`))
        return (
          <Link key={href} href={href} onClick={() => setOpen(false)} className={`mb-2 block rounded-lg px-4 py-4 text-sm font-semibold transition ${isActive ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-white/5 hover:bg-white/10'}`}>
            {label}
          </Link>
        )
      })}
      <Link href="/contact" onClick={() => setOpen(false)} className="mt-4 block rounded-full bg-primary px-5 py-3 text-center text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">Book a visit</Link>
    </nav>}
  </header>
}

export const Footer = () => <footer className="border-t border-white/10 bg-black/20"><div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]"><div><Link href="/" className="font-display text-2xl font-bold">FAM <span className="text-primary">AutoMobile</span></Link><p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">Fair-price car dealing and honest workshop service, all under one roof.</p><div className="mt-5 flex gap-3"><a href={business.instagram} aria-label="Instagram" className="rounded-full border border-white/10 p-2 text-muted-foreground hover:text-primary"><Instagram className="h-4 w-4" /></a><a href={business.whatsappLink} aria-label="WhatsApp" className="rounded-full border border-white/10 p-2 text-muted-foreground hover:text-primary"><MessageCircle className="h-4 w-4" /></a></div></div><div><p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-primary">Explore</p>{nav.slice(0, 3).map(([label, href]) => <Link key={href} href={href} className="mb-3 block text-sm text-muted-foreground hover:text-foreground">{label}</Link>)}</div><div><p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-primary">Visit us</p><p className="flex gap-2 text-sm leading-6 text-muted-foreground"><MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />{business.address}</p><p className="mt-3 flex gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4 text-primary" />{business.phone}</p></div><div><p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-primary">Opening hours</p><p className="text-sm leading-7 text-muted-foreground">Mon — Sat: 9:00 AM — 8:00 PM<br />Sunday: 11:00 AM — 5:00 PM</p><Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-amber-300">Get directions <ArrowRight className="h-4 w-4" /></Link></div></div><div className="container border-t border-white/10 py-5 text-xs text-muted-foreground">© 2026 FAM AutoMobile. Built on trust, driven by care.</div></footer>

export const WhatsApp = () => <a href={business.whatsappLink} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-5 font-bold text-white shadow-2xl shadow-[#25D366]/20 transition hover:scale-105 hover:bg-[#20ba59]"><MessageCircle className="h-6 w-6" /><span>Chat with us</span></a>
