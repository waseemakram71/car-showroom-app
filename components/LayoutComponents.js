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
      className="rounded-full p-2 transition ml-2"
      style={{ background: 'rgba(255,255,255,0.10)', color: '#F7F8F8' }}
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
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  return (
    <button
      onClick={() => switchLanguage(locale === 'en' ? 'ur' : 'en')}
      className="rounded-full px-4 py-2 text-sm font-bold transition ml-2 uppercase"
      style={{ background: 'rgba(255,255,255,0.10)', color: '#F7F8F8' }}
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

  return (
    <header style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)' }} className="fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur-xl">
      <div className="w-full px-6 lg:px-16 xl:px-24 flex h-20 items-center justify-between mx-auto max-w-[1920px]">
        <Link href={`/${locale}`} className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl text-xl font-black" style={{ background: '#0D2D40', color: '#F7F8F8' }}>F</span>
          <span className="font-display text-xl font-bold tracking-tight" style={{ color: '#F7F8F8' }}>FAM <span style={{ color: '#B8C3CA' }}>AutoMobile</span></span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map(([label, href]) => {
            const isActive = pathname === href || (href !== `/${locale}` && pathname?.startsWith(`${href}/`))
            return (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-full text-sm font-medium transition"
                style={isActive
                  ? { background: '#0D2D40', color: '#FFFFFF', fontWeight: 700 }
                  : { color: '#B8C3CA' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#FFFFFF' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#B8C3CA' }}
              >
                {label}
              </Link>
            )
          })}
          <Link href={`/${locale}/admin`} className="ml-2 px-4 py-2 rounded-full text-sm font-bold transition"
            style={{ background: '#0D2D40', color: '#F7F8F8' }}>
            {t('admin')}
          </Link>
          <ThemeToggle />
          <LanguageSwitcher />
          <div className="ml-2">
            <Link
              href={`/${locale}/contact`}
              className="rounded-full px-5 py-3 text-sm font-bold transition"
              style={{ background: '#F7F8F8', color: '#071D2B' }}
              onMouseEnter={e => e.currentTarget.style.background = '#DCE2E6'}
              onMouseLeave={e => e.currentTarget.style.background = '#F7F8F8'}
            >
              {t('bookVisit')} <ArrowRight className="ml-2 inline h-4 w-4" />
            </Link>
          </div>
        </nav>
        <button className="rounded-lg p-2 md:hidden" style={{ color: '#F7F8F8' }}
          onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="container border-t border-white/10 pb-5 pt-3 md:hidden">
          {nav.map(([label, href]) => {
            const isActive = pathname === href || (href !== `/${locale}` && pathname?.startsWith(`${href}/`))
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className="mb-2 block rounded-lg px-4 py-4 text-sm font-semibold transition"
                style={isActive
                  ? { background: '#0D2D40', color: '#FFFFFF' }
                  : { background: 'rgba(255,255,255,0.05)', color: '#B8C3CA' }}>
                {label}
              </Link>
            )
          })}
          <Link href={`/${locale}/admin`} onClick={() => setOpen(false)}
            className="mb-2 block rounded-lg px-4 py-4 text-sm font-bold transition"
            style={{ background: '#0D2D40', color: '#F7F8F8' }}>
            {t('admin')}
          </Link>
          <Link href={`/${locale}/contact`} onClick={() => setOpen(false)}
            className="mt-4 block rounded-full px-5 py-3 text-center text-sm font-bold"
            style={{ background: '#F7F8F8', color: '#071D2B' }}>
            {t('bookVisit')}
          </Link>
        </nav>
      )}
    </header>
  )
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
    <footer style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)', borderTop: '1px solid rgba(255,255,255,0.10)' }}>
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href={`/${locale}`} className="font-display text-2xl font-bold" style={{ color: '#F7F8F8' }}>
            FAM <span style={{ color: '#B8C3CA' }}>AutoMobile</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-7" style={{ color: '#B8C3CA' }}>
            {tFooter('description')}
          </p>
          <div className="mt-5 flex gap-3">
            <a href={business.instagram} aria-label="Instagram" className="rounded-full border p-2 transition"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#B8C3CA' }}
              onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
              onMouseLeave={e => e.currentTarget.style.color = '#B8C3CA'}>
              <Instagram className="h-4 w-4" />
            </a>
            <a href={business.whatsappLink} aria-label="WhatsApp" className="rounded-full border p-2 transition"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#B8C3CA' }}
              onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
              onMouseLeave={e => e.currentTarget.style.color = '#B8C3CA'}>
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.2em]" style={{ color: '#F7F8F8' }}>{tCommon('explore')}</p>
          {nav.slice(0, 3).map(([label, href]) => (
            <Link key={href} href={href} className="mb-3 block text-sm transition" style={{ color: '#B8C3CA' }}
              onMouseEnter={e => e.currentTarget.style.color = '#F7F8F8'}
              onMouseLeave={e => e.currentTarget.style.color = '#B8C3CA'}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.2em]" style={{ color: '#F7F8F8' }}>{tCommon('visitUs')}</p>
          <p className="flex gap-2 text-sm leading-6" style={{ color: '#B8C3CA' }}>
            <MapPin className="mt-1 h-4 w-4 shrink-0" style={{ color: '#F7F8F8' }} />
            {business.address}
          </p>
          <p className="mt-3 flex gap-2 text-sm" style={{ color: '#B8C3CA' }}>
            <Phone className="h-4 w-4" style={{ color: '#F7F8F8' }} />
            {business.phone}
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[.2em]" style={{ color: '#F7F8F8' }}>{tCommon('openingHours')}</p>
          <p className="text-sm leading-7" style={{ color: '#B8C3CA' }}>
            {tFooter('monSat')}<br />{tFooter('sunday')}
          </p>
          <Link href={`/${locale}/contact`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold transition"
            style={{ color: '#F7F8F8' }}
            onMouseEnter={e => e.currentTarget.style.color = '#DCE2E6'}
            onMouseLeave={e => e.currentTarget.style.color = '#F7F8F8'}>
            {tCommon('getDirections')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="container py-5 text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: '#63717C' }}>
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
    <a
      href={business.whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full px-5 font-bold text-white transition hover:scale-105"
      style={{ background: '#0D4B48', boxShadow: '0 8px 24px rgba(13,75,72,0.35)' }}
      onMouseEnter={e => e.currentTarget.style.background = '#0A3D3A'}
      onMouseLeave={e => e.currentTarget.style.background = '#0D4B48'}
    >
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
