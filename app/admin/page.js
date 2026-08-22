import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Car, Wrench, MessageSquare } from 'lucide-react'

export default async function AdminDashboard() {
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
      <h1 className="font-display text-3xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid gap-6 md:grid-cols-3">
        
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-4 text-primary">
            <Car className="h-8 w-8" />
            <h2 className="text-xl font-bold">Inventory</h2>
          </div>
          <div className="mt-4 flex justify-between items-end">
            <div>
              <p className="text-3xl font-black">{availableCars}</p>
              <p className="text-sm text-muted-foreground">Available Cars</p>
            </div>
            <Link href="/admin/cars" className="text-sm font-bold text-primary hover:underline">Manage</Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-4 text-primary">
            <Wrench className="h-8 w-8" />
            <h2 className="text-xl font-bold">Services</h2>
          </div>
          <div className="mt-4 flex justify-between items-end">
            <div>
              <p className="text-3xl font-black">{totalServices}</p>
              <p className="text-sm text-muted-foreground">Total Services</p>
            </div>
            <Link href="/admin/services" className="text-sm font-bold text-primary hover:underline">Manage</Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-4 text-primary">
            <MessageSquare className="h-8 w-8" />
            <h2 className="text-xl font-bold">Inquiries</h2>
          </div>
          <div className="mt-4 flex justify-between items-end">
            <div>
              <p className="text-3xl font-black">{newInquiries}</p>
              <p className="text-sm text-muted-foreground">Last 7 days</p>
            </div>
            <Link href="/admin/inquiries" className="text-sm font-bold text-primary hover:underline">View All</Link>
          </div>
        </div>

      </div>
    </div>
  )
}
