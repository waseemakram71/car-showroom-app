import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { AdminNav } from '@/components/AdminNav'
import { getTranslations } from 'next-intl/server'

export const metadata = { title: 'Admin | FAM AutoMobile' }

export default async function AdminLayout({ children, params }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Admin' });


  return (
    <div className="flex h-[calc(100vh-80px)] bg-muted/20">
      <aside className="w-64 border-e border-border bg-card flex flex-col">
        <div className="flex h-20 shrink-0 items-center px-6 border-b border-border">
          <Link href={`/${locale}/admin`} className="font-display text-xl font-bold">
            FAM <span className="text-primary">Admin</span>
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
        <div className="p-4 mt-auto">
          <Link href="/api/auth/signout" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-500/10">
            <LogOut className="h-4 w-4 shrink-0" />
            {t('logout')}
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
