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
        <h1 className="font-display text-3xl font-bold" style={{ color: '#091C29' }}>Manage Services</h1>
        <Link href={`/${locale}/admin/services/new`} className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition"
          style={{ background: '#071D2B', color: '#FFFFFF' }}
        >
          <Plus className="h-4 w-4" /> Add Service
        </Link>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #DCE2E6', boxShadow: '0 4px 12px rgba(7,29,43,0.06)' }}>
        <table className="w-full text-left text-sm">
          <thead style={{ background: '#071D2B', color: '#FFFFFF' }}>
            <tr>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Service Title</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Description</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id} className="transition" style={{ borderBottom: '1px solid #DCE2E6' }}>
                <td className="px-6 py-4 font-bold text-base" style={{ color: '#091C29' }}>{service.title}</td>
                <td className="px-6 py-4" style={{ color: '#63717C' }}>{service.description.substring(0, 100)}...</td>
                <td className="px-6 py-4 text-right">
                  <button className="inline-flex p-2 rounded-lg transition hover:bg-red-50 hover:text-red-500" style={{ color: '#63717C' }}>
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center" style={{ color: '#63717C' }}>No services added.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
