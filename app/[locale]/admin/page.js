import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Car, Wrench, MessageSquare } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function AdminDashboard({ params }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Admin' });

  const [totalCars, availableCars, totalServices, newInquiries] = await Promise.all([
    prisma.car.count(),
    prisma.car.count({ where: { status: 'available' } }),
    prisma.service.count(),
    prisma.inquiry.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)) // last 7 days
        }
      }
    }),
  ])

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-8">{t('overview')}</h1>
      <div className="grid gap-6 md:grid-cols-3">
        
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-4 text-primary">
            <Car className="h-8 w-8" />
            <h2 className="text-xl font-bold">{t('inventory')}</h2>
          </div>
          <div className="mt-4 flex justify-between items-end">
            <div>
              <p className="text-3xl font-black">{availableCars}</p>
              <p className="text-sm text-muted-foreground">{t('availableCars')}</p>
            </div>
            <Link href={`/${locale}/admin/cars`} className="text-sm font-bold text-primary hover:underline">{t('manage')}</Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-4 text-primary">
            <Wrench className="h-8 w-8" />
            <h2 className="text-xl font-bold">{t('services')}</h2>
          </div>
          <div className="mt-4 flex justify-between items-end">
            <div>
              <p className="text-3xl font-black">{totalServices}</p>
              <p className="text-sm text-muted-foreground">{t('totalServices')}</p>
            </div>
            <Link href={`/${locale}/admin/services`} className="text-sm font-bold text-primary hover:underline">{t('manage')}</Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-4 text-primary">
            <MessageSquare className="h-8 w-8" />
            <h2 className="text-xl font-bold">{t('inquiries')}</h2>
          </div>
          <div className="mt-4 flex justify-between items-end">
            <div>
              <p className="text-3xl font-black">{newInquiries}</p>
              <p className="text-sm text-muted-foreground">{t('last7Days')}</p>
            </div>
            <Link href={`/${locale}/admin/inquiries`} className="text-sm font-bold text-primary hover:underline">{t('viewAll')}</Link>
          </div>
        </div>

      </div>
    </div>
  )
}
