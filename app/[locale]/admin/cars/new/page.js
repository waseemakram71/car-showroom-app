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

      <div className="relative">
        {/* Subtle decorative glowing background for the glass effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full opacity-60"></div>
        
        <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-3xl backdrop-blur-2xl bg-[#071D2B]/80 border border-white/10 shadow-[0_8px_32px_rgba(7,29,43,0.2)] relative overflow-hidden">
          {/* subtle inner highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-3xl"></div>
          
          {error && <div className="relative p-4 bg-red-500/10 text-red-200 rounded-xl text-sm font-bold border border-red-500/20">{error}</div>}
          
          <div className="relative grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Car Name</label>
              <input required name="name" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="e.g. Honda Civic Oriel" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Brand</label>
              <input required name="brand" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="e.g. Honda" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Year</label>
              <input required type="number" name="year" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="2022" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Price</label>
              <input required name="price" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="PKR 6,890,000" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Mileage</label>
              <input required name="mileage" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="42,500 km" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Fuel Type</label>
              <input required name="fuelType" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="Petrol" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Transmission</label>
              <input required name="transmission" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="Automatic / CVT" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Body Type</label>
              <input required name="bodyType" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="Sedan / SUV" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-white/90">Description</label>
            <textarea required name="description" rows={4} className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10"></textarea>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-white/90">Cover Image</label>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full rounded-xl px-4 py-3 text-sm outline-none transition text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer" />
          </div>

          <div className="relative flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
            <input type="checkbox" name="featured" id="featured" className="h-5 w-5 rounded border-white/20 bg-white/10 text-white focus:ring-white/50 focus:ring-offset-0 focus:ring-2 cursor-pointer transition" />
            <label htmlFor="featured" className="text-sm font-medium cursor-pointer text-white/90">Feature on Homepage</label>
          </div>

          <button disabled={loading} type="submit" className="relative w-full rounded-xl px-4 py-4 font-bold transition disabled:opacity-50 bg-white text-[#071D2B] hover:bg-[#F1F4F6] hover:scale-[1.01] active:scale-[0.99] shadow-lg">
            {loading ? 'Saving...' : 'Save Car'}
          </button>
        </form>
      </div>
    </div>
  )
}
