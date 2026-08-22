import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Pencil, Trash } from 'lucide-react'

export default async function AdminCarsPage() {
  const cars = await prisma.car.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold">Manage Inventory</h1>
        <Link href="/admin/cars/new" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Car
        </Link>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-medium">Car</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {cars.map(car => (
              <tr key={car.id} className="hover:bg-muted/20">
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{car.name}</div>
                  <div className="text-muted-foreground text-xs">{car.year} • {car.mileage}</div>
                </td>
                <td className="px-6 py-4">{car.price}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${car.status === 'available' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {car.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/cars/${car.id}`} className="inline-flex p-2 text-muted-foreground hover:text-primary transition">
                    <Pencil className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
            {cars.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-muted-foreground">No cars in inventory.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
