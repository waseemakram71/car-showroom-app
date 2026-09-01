'use client'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export default function NewServicePage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.target)
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      icon: formData.get('icon') || '',
    }

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error('Failed to create service')
      }

      router.push(`/${locale}/admin/services`)
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto text-[#091C29]">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/${locale}/admin/services`} className="inline-flex items-center gap-2 text-sm text-[#63717C] hover:text-[#071D2B] mb-4 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Services
        </Link>
      </div>
      <h1 className="font-display text-3xl font-bold mb-8 text-[#071D2B]">Add New Service</h1>

      <div className="p-8 rounded-3xl" style={{ background: '#071D2B', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 24px rgba(7,29,43,0.12)' }}>
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-bold mb-2 text-[#F7F8F8]">Service Title *</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required 
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-[#87939C] focus:border-white focus:ring-1 focus:ring-white"
              style={{ backgroundColor: '#0D2D40', borderColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }}
              placeholder="e.g. Engine Diagnostics"
            />
          </div>

          <div>
            <label htmlFor="icon" className="block text-sm font-bold mb-2 text-[#F7F8F8]">Icon (Optional)</label>
            <input 
              type="text" 
              id="icon" 
              name="icon" 
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-[#87939C] focus:border-white focus:ring-1 focus:ring-white"
              style={{ backgroundColor: '#0D2D40', borderColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }}
              placeholder="e.g. Wrench"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-bold mb-2 text-[#F7F8F8]">Description *</label>
            <textarea 
              id="description" 
              name="description" 
              required 
              rows="5"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-[#87939C] focus:border-white focus:ring-1 focus:ring-white resize-none"
              style={{ backgroundColor: '#0D2D40', borderColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }}
              placeholder="Describe the service..."
            ></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition disabled:opacity-50"
              style={{ background: '#FFFFFF', color: '#071D2B' }}
              onMouseEnter={e => e.currentTarget.style.background = '#F1F4F6'}
              onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              Save Service
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
