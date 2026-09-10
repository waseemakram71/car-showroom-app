import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Car, Wrench, MessageSquare } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import DashboardCharts from '@/components/admin/DashboardCharts'

export default async function AdminDashboard({ params }) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Admin' });

  const [totalCars, availableCars, totalServices, newInquiries, cars] = await Promise.all([
    prisma.car.count(),
    prisma.car.count({ where: { status: 'available' } }),
    prisma.service.count(),
    prisma.inquiry.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7))
        }
      }
    }),
    prisma.car.findMany({ orderBy: { createdAt: 'desc' } })
  ])

  const cards = [
    { icon: Car, label: t('inventory'), value: availableCars, sub: t('availableCars'), href: `/${locale}/admin/cars`, action: t('manage') },
    { icon: Wrench, label: t('services'), value: totalServices, sub: t('totalServices'), href: `/${locale}/admin/services`, action: t('manage') },
    { icon: MessageSquare, label: t('inquiries'), value: newInquiries, sub: t('last7Days'), href: `/${locale}/admin/inquiries`, action: t('viewAll') },
  ]

  // Chart translations passed as serializable props to the client component
  const chartTranslations = {
    monthlySales: t('monthlySales'),
    salesRevenue: t('salesRevenue'),
    carsSold: t('carsSold'),
    revenueVsExpense: t('revenueVsExpense'),
    inquiryTrends: t('inquiryTrends'),
    totalCarsSold: t('totalCarsSold'),
    totalRevenue: t('totalRevenue'),
    totalInquiries: t('totalInquiries'),
    noChartData: t('noChartData'),
  }

  const employeeTranslations = {
    manageEmployees: t('manageEmployees'),
    addEmployee: t('addEmployee'),
    employee: t('employee'),
    role: t('role'),
    salary: t('salary'),
    status: t('status'),
    actions: t('actions'),
    noEmployees: t('noEmployees'),
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-8" style={{ color: '#091C29' }}>
        {t('overview')}
      </h1>
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map(({ icon: Icon, label, value, sub, href, action }) => (
          <div
            key={label}
            className="rounded-2xl p-6 transition border border-white/10 hover:border-white/30 shadow-lg group"
            style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl p-2 bg-white/10">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-base font-bold text-white">{label}</h2>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-4xl font-black text-white">{value}</p>
                <p className="text-sm mt-1 text-[#B8C3CA]">{sub}</p>
              </div>
              <Link
                href={href}
                className="text-sm font-bold transition text-[#B8C3CA] hover:text-white"
              >
                {action} →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <DashboardCharts translations={chartTranslations} />

    </div>
  )
}
