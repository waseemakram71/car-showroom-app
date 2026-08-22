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
    <div className="max-w-3xl">
      <div className="mb-8">
        <Link href="/admin/cars" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Inventory
        </Link>
        <h1 className="font-display text-3xl font-bold">Add New Car</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl border border-border">
        {error && <div className="p-4 bg-red-500/10 text-red-500 rounded-lg">{error}</div>}
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">Car Name</label>
            <input required name="name" className="w-full rounded-lg border border-input bg-background px-4 py-3" placeholder="e.g. Honda Civic Oriel" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Brand</label>
            <input required name="brand" className="w-full rounded-lg border border-input bg-background px-4 py-3" placeholder="e.g. Honda" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <input required type="number" name="year" className="w-full rounded-lg border border-input bg-background px-4 py-3" placeholder="2022" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price</label>
            <input required name="price" className="w-full rounded-lg border border-input bg-background px-4 py-3" placeholder="PKR 6,890,000" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Mileage</label>
            <input required name="mileage" className="w-full rounded-lg border border-input bg-background px-4 py-3" placeholder="42,500 km" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Fuel Type</label>
            <input required name="fuelType" className="w-full rounded-lg border border-input bg-background px-4 py-3" placeholder="Petrol" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Transmission</label>
            <input required name="transmission" className="w-full rounded-lg border border-input bg-background px-4 py-3" placeholder="Automatic / CVT" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Body Type</label>
            <input required name="bodyType" className="w-full rounded-lg border border-input bg-background px-4 py-3" placeholder="Sedan / SUV" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea required name="description" rows={4} className="w-full rounded-lg border border-input bg-background px-4 py-3"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full rounded-lg border border-input bg-background px-4 py-3" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="featured" id="featured" className="h-4 w-4" />
          <label htmlFor="featured" className="text-sm font-medium">Feature on Homepage</label>
        </div>

        <button disabled={loading} type="submit" className="w-full rounded-lg bg-primary px-4 py-3 font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Car'}
        </button>
      </form>
    </div>
  )
}
