'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewCarPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageFile, setImageFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formData = new FormData(e.target)
    let imageUrl = ''

    if (imageFile) {
      const uploadData = new FormData()
      uploadData.append('file', imageFile)
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData
      })
      const uploadJson = await uploadRes.json()
      
      if (uploadJson.url) {
        imageUrl = uploadJson.url
      } else {
        setError('Image upload failed')
        setLoading(false)
        return
      }
    }

    const carData = {
      name: formData.get('name'),
      brand: formData.get('brand'),
      slug: formData.get('name').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      year: parseInt(formData.get('year')),
      price: formData.get('price'),
      mileage: formData.get('mileage'),
      fuelType: formData.get('fuelType'),
      transmission: formData.get('transmission'),
      bodyType: formData.get('bodyType'),
      description: formData.get('description'),
      featured: formData.get('featured') === 'on',
      images: imageUrl ? [imageUrl] : [],
    }

    const res = await fetch('/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carData)
    })

    if (res.ok) {
      router.push('/admin/cars')
      router.refresh()
    } else {
      setError('Failed to create car')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto text-[#091C29]">
      <div className="mb-8">
        <Link href="/admin/cars" className="inline-flex items-center gap-2 text-sm text-[#63717C] hover:text-[#071D2B] mb-4 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Inventory
        </Link>
        <h1 className="font-display text-3xl font-bold text-[#071D2B]">Add New Car</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-3xl" style={{ background: '#071D2B', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 24px rgba(7,29,43,0.12)' }}>
        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">{error}</div>}
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-bold mb-2 text-[#F7F8F8]">Car Name</label>
            <input required name="name" className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-[#87939C] focus:border-white focus:ring-1 focus:ring-white" style={{ backgroundColor: '#0D2D40', borderColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }} placeholder="e.g. Honda Civic Oriel" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-[#F7F8F8]">Brand</label>
            <input required name="brand" className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-[#87939C] focus:border-white focus:ring-1 focus:ring-white" style={{ backgroundColor: '#0D2D40', borderColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }} placeholder="e.g. Honda" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-[#F7F8F8]">Year</label>
            <input required type="number" name="year" className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-[#87939C] focus:border-white focus:ring-1 focus:ring-white" style={{ backgroundColor: '#0D2D40', borderColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }} placeholder="2022" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-[#F7F8F8]">Price</label>
            <input required name="price" className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-[#87939C] focus:border-white focus:ring-1 focus:ring-white" style={{ backgroundColor: '#0D2D40', borderColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }} placeholder="PKR 6,890,000" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-[#F7F8F8]">Mileage</label>
            <input required name="mileage" className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-[#87939C] focus:border-white focus:ring-1 focus:ring-white" style={{ backgroundColor: '#0D2D40', borderColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }} placeholder="42,500 km" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-[#F7F8F8]">Fuel Type</label>
            <input required name="fuelType" className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-[#87939C] focus:border-white focus:ring-1 focus:ring-white" style={{ backgroundColor: '#0D2D40', borderColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }} placeholder="Petrol" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-[#F7F8F8]">Transmission</label>
            <input required name="transmission" className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-[#87939C] focus:border-white focus:ring-1 focus:ring-white" style={{ backgroundColor: '#0D2D40', borderColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }} placeholder="Automatic / CVT" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-[#F7F8F8]">Body Type</label>
            <input required name="bodyType" className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-[#87939C] focus:border-white focus:ring-1 focus:ring-white" style={{ backgroundColor: '#0D2D40', borderColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }} placeholder="Sedan / SUV" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-[#F7F8F8]">Description</label>
          <textarea required name="description" rows={4} className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-[#87939C] focus:border-white focus:ring-1 focus:ring-white" style={{ backgroundColor: '#0D2D40', borderColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }}></textarea>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-[#F7F8F8]">Cover Image</label>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-white focus:ring-1 focus:ring-white cursor-pointer" style={{ backgroundColor: '#0D2D40', borderColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }} />
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <input type="checkbox" name="featured" id="featured" className="h-5 w-5 rounded border-gray-300 text-[#071D2B] focus:ring-white" />
          <label htmlFor="featured" className="text-sm font-bold cursor-pointer text-[#F7F8F8]">Feature on Homepage</label>
        </div>

        <button disabled={loading} type="submit" className="w-full rounded-xl px-4 py-4 font-bold transition disabled:opacity-50"
          style={{ background: '#FFFFFF', color: '#071D2B' }}
          onMouseEnter={e => e.currentTarget.style.background = '#F1F4F6'}
          onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
        >
          {loading ? 'Saving...' : 'Save Car'}
        </button>
      </form>
    </div>
  )
}
