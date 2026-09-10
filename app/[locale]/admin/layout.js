import Link from 'next/link'
import { LogOut, ExternalLink } from 'lucide-react'
import { AdminNav } from '@/components/AdminNav'
import { getTranslations } from 'next-intl/server'

import { SignOutButton } from '@/components/SignOutButton'
import AdminSidebarWrapper from '@/components/admin/AdminSidebarWrapper'

export const metadata = { title: 'Admin | FAM AutoMobile' }

export default async function AdminLayout({ children, params }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Admin' });

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden" style={{ background: '#F1F4F6' }}>
      {/* Sidebar Wrapper for Mobile Responsiveness */}
      <AdminSidebarWrapper>
        <div className="hidden md:flex h-20 shrink-0 items-center px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Link href={`/${locale}/admin`} className="flex items-center -ml-2 mt-4 mb-4">
            <img src="/logo.png" alt="FAM AutoMobile" className="h-16 w-auto object-contain mix-blend-screen scale-110 md:scale-[1.3] origin-left" />
          </Link>
        </div>
        <div className="md:hidden h-10"></div> {/* Spacer for mobile */}
        <AdminNav
          locale={locale}
          translations={{
            dashboard: t('dashboard'),
            inventory: t('inventory'),
            employees: t('employees'),
            purchases: t('purchases'),
            services: t('services'),
            inquiries: t('inquiries')
          }}
        />
        <div className="p-4 mt-auto flex flex-col gap-2">
          <Link
            href={`/${locale}`}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition text-[#B8C3CA] hover:text-white bg-transparent hover:bg-white/5"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            View Live Site
          </Link>
          <SignOutButton label={t('logout')} />
        </div>
      </AdminSidebarWrapper>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden w-full min-w-0" style={{ color: '#091C29' }}>
        {children}
      </main>
    </div>
  )
}
