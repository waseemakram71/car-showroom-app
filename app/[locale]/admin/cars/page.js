import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Pencil, Trash } from 'lucide-react'
import { DeleteCarButton } from '@/components/DeleteCarButton'

export default async function AdminCarsPage() {
  const cars = await prisma.car.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold" style={{ color: '#091C29' }}>Manage Inventory</h1>
        <Link href="/admin/cars/new" className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition"
          style={{ background: '#071D2B', color: '#FFFFFF' }}
        >
          <Plus className="h-4 w-4" /> Add Car
        </Link>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #DCE2E6', boxShadow: '0 4px 12px rgba(7,29,43,0.06)' }}>
        <table className="w-full text-left text-sm">
          <thead style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)', color: '#FFFFFF' }}>
            <tr>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Model Name</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Year</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Mileage</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Price</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Status</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car.id} className="transition" style={{ borderBottom: '1px solid #DCE2E6' }}>
                <td className="px-6 py-4 font-bold text-base" style={{ color: '#091C29' }}>{car.name}</td>
                <td className="px-6 py-4" style={{ color: '#63717C' }}>{car.year}</td>
                <td className="px-6 py-4" style={{ color: '#63717C' }}>{car.mileage}</td>
                <td className="px-6 py-4 font-bold" style={{ color: '#071D2B' }}>{car.price}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${car.status === 'available' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {car.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                  <Link href={`/admin/cars/${car.id}`} className="inline-flex p-2 rounded-lg transition hover:bg-[rgba(7,29,43,0.05)]" style={{ color: '#63717C' }} title="Edit car">
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteCarButton carId={car.id} />
                </td>
              </tr>
            ))}
            {cars.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center" style={{ color: '#63717C' }}>No cars in inventory.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
