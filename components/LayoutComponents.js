'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Instagram, MessageCircle, MapPin, Phone, X, Menu, Moon, Sun } from 'lucide-react'
import { business } from '@/lib/config'
import { useSession } from 'next-auth/react'

import { useTheme } from 'next-themes'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full bg-white/5 p-2 text-foreground transition hover:bg-white/15 ml-2"
      aria-label="Toggle dark mode"
    >
      <span className="hidden dark:block"><Sun className="h-5 w-5" /></span>
      <span className="block dark:hidden"><Moon className="h-5 w-5" /></span>
    </button>
  )
}

export const LanguageSwitcher = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  
  const switchLanguage = (newLocale) => {
    // Basic implementation to swap locale in path
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  return (
    <button
      onClick={() => switchLanguage(locale === 'en' ? 'ur' : 'en')}
      className="rounded-full bg-white/5 px-4 py-2 text-sm font-bold text-foreground transition hover:bg-white/15 ml-2 uppercase"
    >
      {locale === 'en' ? 'UR' : 'EN'}
    </button>
  )
}

export const SiteNav = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const t = useTranslations('Nav')
  const locale = useLocale()

  const nav = [
    [t('inventory'), `/${locale}/inventory`], 
    [t('services'), `/${locale}/services`], 
    [t('about'), `/${locale}/about`], 
    [t('contact'), `/${locale}/contact`]
  ]

  if (pathname?.includes('/admin')) return null
  
  
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/85 backdrop-blur-xl">
    <div className="container flex h-20 items-center justify-between">
      <Link href={`/${locale}`} className="flex items-center gap-3" onClick={() => setOpen(false)}><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-xl font-black text-primary-foreground">F</span><span className="font-display text-xl font-bold tracking-tight">FAM <span className="text-primary">AutoMobile</span></span></Link>
      <nav className="hidden items-center gap-2 md:flex">
        {nav.map(([label, href]) => {
          const isActive = pathname === href || (href !== `/${locale}` && pathname?.startsWith(`${href}/`))
          return (
            <Link key={href} href={href} className={`px-4 py-2 rounded-full text-sm font-medium transition ${isActive ? 'bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20' : 'bg-white/5 text-foreground hover:bg-white/15'}`}>
              {label}
            </Link>
          )
        })}
        {session && (
          <Link href={`/${locale}/admin`} className="ml-2 px-4 py-2 rounded-full text-sm font-bold bg-white/10 text-white hover:bg-white/20 transition">
            {t('admin')}
          </Link>
        )}
        <ThemeToggle />
        <LanguageSwitcher />
        <div className="ml-2"><Link href={`/${locale}/contact`} className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-amber-300 shadow-lg shadow-primary/20">{t('bookVisit')} <ArrowRight className="ml-2 inline h-4 w-4" /></Link></div>
      </nav>
      <button className="rounded-lg p-2 text-foreground md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="container border-t border-white/10 pb-5 pt-3 md:hidden">
      {nav.map(([label, href]) => {
        const isActive = pathname === href || (href !== `/${locale}` && pathname?.startsWith(`${href}/`))
        return (
          <Link key={href} href={href} onClick={() => setOpen(false)} className={`mb-2 block rounded-lg px-4 py-4 text-sm font-semibold transition ${isActive ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-white/5 hover:bg-white/10'}`}>
            {label}
          </Link>
        )
      })}
      {session && (
        <Link href={`/${locale}/admin`} onClick={() => setOpen(false)} className="mb-2 block rounded-lg px-4 py-4 text-sm font-bold bg-white/10 text-white hover:bg-white/20 transition">
          {t('admin')}
        </Link>
      )}
      <Link href={`/${locale}/contact`} onClick={() => setOpen(false)} className="mt-4 block rounded-full bg-primary px-5 py-3 text-center text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">{t('bookVisit')}</Link>
    </nav>}
  </header>
}

export const Footer = () => {
  const tNav = useTranslations('Nav')
  const tCommon = useTranslations('Common')
  const tFooter = useTranslations('Footer')
  const locale = useLocale()

  const nav = [
    [tNav('inventory'), `/${locale}/inventory`],
    [tNav('services'), `/${locale}/services`],
    [tNav('about'), `/${locale}/about`],
    [tNav('contact'), `/${locale}/contact`]
  ]

  const pathname = usePathname()
  if (pathname?.includes('/admin')) return null

  return (
    <footer className="border-t border-white/10 bg-white/5">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href={`/${locale}`} className="font-display text-2xl font-bold">
            FAM <span className="text-primary">AutoMobile</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">
            {tFooter('description')}
          </p>
          <div className="mt-5 flex gap-3">
            <a href={business.instagram} aria-label="Instagram" className="rounded-full border border-white/10 p-2 text-muted-foreground hover:text-primary">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={business.whatsappLink} aria-label="WhatsApp" className="rounded-full border border-white/10 p-2 text-muted-foreground hover:text-primary">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-primary">{tCommon('explore')}</p>
          {nav.slice(0, 3).map(([label, href]) => (
            <Link key={href} href={href} className="mb-3 block text-sm text-muted-foreground hover:text-foreground">
              {label}
            </Link>
          ))}
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-primary">{tCommon('visitUs')}</p>
          <p className="flex gap-2 text-sm leading-6 text-muted-foreground">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
            {business.address}
          </p>
          <p className="mt-3 flex gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" />
            {business.phone}
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-primary">{tCommon('openingHours')}</p>
          <p className="text-sm leading-7 text-muted-foreground">
            {tFooter('monSat')}<br />{tFooter('sunday')}
          </p>
          <Link href={`/${locale}/contact`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-amber-300">
            {tCommon('getDirections')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="container border-t border-white/10 py-5 text-xs text-muted-foreground">
        {tFooter('copyright')}
      </div>
    </footer>
  )
}

export const WhatsApp = () => {
  const tCommon = useTranslations('Common')
  const pathname = usePathname()
  if (pathname?.includes('/admin')) return null
  
  return (
    <a href={business.whatsappLink} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-5 font-bold text-white shadow-2xl shadow-[#25D366]/20 transition hover:scale-105 hover:bg-[#20ba59]">
      <MessageCircle className="h-6 w-6" />
      <span>{tCommon('chat')}</span>
    </a>
  )
}

export const MainContentWrapper = ({ children }) => {
  const pathname = usePathname()
  if (pathname?.includes('/admin')) {
    return <>{children}</>
  }
  return <div className="pt-20 min-h-[calc(100vh-80px)]">{children}</div>
}

