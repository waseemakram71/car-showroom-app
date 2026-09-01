import Link from 'next/link'
import { LogOut, ExternalLink } from 'lucide-react'
import { AdminNav } from '@/components/AdminNav'
import { getTranslations } from 'next-intl/server'

import { SignOutButton } from '@/components/SignOutButton'

export const metadata = { title: 'Admin | FAM AutoMobile' }

export default async function AdminLayout({ children, params }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Admin' });

  return (
    <div className="flex h-screen" style={{ background: '#F1F4F6' }}>
      {/* Sidebar */}
      <aside className="w-64 flex flex-col" style={{ background: 'linear-gradient(160deg, #071D2B 0%, #0D324A 100%)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex h-20 shrink-0 items-center px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Link href={`/${locale}/admin`} className="font-display text-xl font-bold" style={{ color: '#F7F8F8' }}>
            FAM <span style={{ color: '#B8C3CA' }}>Admin</span>
          </Link>
        </div>
        <AdminNav
          locale={locale}
          translations={{
            dashboard: t('dashboard'),
            inventory: t('inventory'),
            services: t('services'),
            inquiries: t('inquiries')
          }}
        />
        <div className="p-4 mt-auto flex flex-col gap-2">
          <Link
            href={`/${locale}`}
            target="_blank"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition text-[#B8C3CA] hover:text-white bg-transparent hover:bg-white/5"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            View Live Site
          </Link>
          <SignOutButton label={t('logout')} />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto" style={{ color: '#091C29' }}>
        {children}
      </main>
    </div>
  )
}
