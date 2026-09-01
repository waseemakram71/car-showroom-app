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
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/${locale}/admin/services`} className="p-2 rounded-full hover:bg-muted/50 transition">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-display text-3xl font-bold">Add New Service</h1>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        {error && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6 text-sm font-medium">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">Service Title *</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required 
              className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:border-primary transition"
              placeholder="e.g. Engine Diagnostics"
            />
          </div>

          <div>
            <label htmlFor="icon" className="block text-sm font-medium mb-2">Icon (Optional)</label>
            <input 
              type="text" 
              id="icon" 
              name="icon" 
              className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:border-primary transition"
              placeholder="e.g. Wrench"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">Description *</label>
            <textarea 
              id="description" 
              name="description" 
              required 
              rows="5"
              className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:border-primary transition resize-none"
              placeholder="Describe the service..."
            ></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold transition hover:opacity-90 disabled:opacity-50"
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
