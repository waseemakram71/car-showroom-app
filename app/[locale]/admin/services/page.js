import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Pencil, Trash } from 'lucide-react'

export default async function AdminServicesPage({ params }) {
  const locale = (await params).locale;
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold">Manage Services</h1>
        <Link href={`/${locale}/admin/services/new`} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Service
        </Link>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-medium">Service Title</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {services.map(service => (
              <tr key={service.id} className="hover:bg-muted/20">
                <td className="px-6 py-4 font-medium text-foreground">{service.title}</td>
                <td className="px-6 py-4 text-muted-foreground">{service.description.substring(0, 100)}...</td>
                <td className="px-6 py-4 text-right">
                  <button className="inline-flex p-2 text-muted-foreground hover:text-red-500 transition">
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-muted-foreground">No services added.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
