'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash, X, Car } from 'lucide-react'

export default function CarPurchasesTable() {
  const router = useRouter()
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPurchase, setEditingPurchase] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchPurchases() {
      try {
        const res = await fetch('/api/car-purchases')
        if (res.ok) {
          const data = await res.json()
          setPurchases(data)
        }
      } catch (err) {
        console.error('Failed to fetch car purchases:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPurchases()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this purchase record?')) {
      return
    }

    try {
      const res = await fetch(`/api/car-purchases/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setPurchases(prev => prev.filter(p => p.id !== id))
      } else {
        alert('Failed to delete the purchase record')
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred')
    }
  }

  const handleOpenAdd = () => {
    setEditingPurchase(null)
    setError('')
    setIsModalOpen(true)
  }

  const handleOpenEdit = (purchase) => {
    setEditingPurchase(purchase)
    setError('')
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')
    
    const formData = new FormData(e.target)
    
    const purchaseData = {
      carModel: formData.get('carModel'),
      company: formData.get('company'),
      purchasePrice: formData.get('purchasePrice'),
      purchaseDate: formData.get('purchaseDate'),
      purchasedFrom: formData.get('purchasedFrom'),
      notes: formData.get('notes') || '',
    }

    try {
      const url = editingPurchase ? `/api/car-purchases/${editingPurchase.id}` : '/api/car-purchases'
      const method = editingPurchase ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchaseData)
      })

      if (res.ok) {
        const savedPurchase = await res.json()
        if (editingPurchase) {
          setPurchases(prev => prev.map(p => p.id === savedPurchase.id ? savedPurchase : p))
        } else {
          setPurchases(prev => [savedPurchase, ...prev])
        }
        setIsModalOpen(false)
        router.refresh()
      } else {
        const errorData = await res.json().catch(() => ({}))
        setError(errorData.error || `Failed to ${editingPurchase ? 'update' : 'add'} purchase`)
      }
    } catch (err) {
      setError('An error occurred while saving.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold" style={{ color: '#091C29' }}>Car Purchases</h1>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition hover:shadow-lg hover:scale-[1.02]"
          style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)', color: '#FFFFFF' }}
        >
          <Plus className="h-4 w-4" /> Add Purchase Record
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #DCE2E6', boxShadow: '0 4px 12px rgba(7,29,43,0.06)' }}>
        <table className="w-full text-left text-sm">
          <thead style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)', color: '#FFFFFF' }}>
            <tr>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Car Model</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Company</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Purchase Price</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Purchase Date</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Purchased From</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center" style={{ color: '#63717C' }}>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    Loading...
                  </div>
                </td>
              </tr>
            ) : purchases.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center" style={{ color: '#63717C' }}>No purchase records found.</td>
              </tr>
            ) : (
              purchases.map(purchase => (
                <tr key={purchase.id} className="transition hover:bg-gray-50" style={{ borderBottom: '1px solid #DCE2E6' }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center text-white" style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)' }}>
                        <Car className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-bold text-base" style={{ color: '#091C29' }}>{purchase.carModel}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium" style={{ color: '#071D2B' }}>{purchase.company}</td>
                  <td className="px-6 py-4 font-bold" style={{ color: '#071D2B' }}>PKR {parseInt(purchase.purchasePrice).toLocaleString()}</td>
                  <td className="px-6 py-4" style={{ color: '#63717C' }}>
                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4" style={{ color: '#071D2B' }}>{purchase.purchasedFrom}</td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleOpenEdit(purchase)}
                      className="inline-flex p-2 rounded-lg transition hover:bg-[#071D2B]/10 hover:scale-110" 
                      style={{ color: '#0D324A' }} 
                      title="Edit record"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(purchase.id)}
                      className="inline-flex p-2 transition rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 hover:scale-110"
                      title="Delete record"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Purchase Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#071D2B] rounded-3xl overflow-hidden shadow-2xl border border-white/10 my-8" style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)' }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition z-10"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 font-display">
                {editingPurchase ? 'Edit Purchase Record' : 'Add New Purchase Record'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative">
                {error && <div className="p-4 bg-red-500/10 text-red-200 rounded-xl text-sm font-bold border border-red-500/20">{error}</div>}
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/90">Car Model</label>
                    <input required defaultValue={editingPurchase?.carModel || ''} name="carModel" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="e.g. Civic Oriel" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/90">Company / Brand</label>
                    <input required defaultValue={editingPurchase?.company || ''} name="company" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="e.g. Honda" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/90">Purchase Price (PKR)</label>
                    <input required type="number" defaultValue={editingPurchase?.purchasePrice || ''} name="purchasePrice" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="5000000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/90">Purchase Date</label>
                    <input required type="date" defaultValue={editingPurchase?.purchaseDate ? new Date(editingPurchase.purchaseDate).toISOString().split('T')[0] : ''} name="purchaseDate" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-white/90">Purchased From</label>
                    <input required defaultValue={editingPurchase?.purchasedFrom || ''} name="purchasedFrom" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="Seller Name or Phone" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-white/90">Notes (Optional)</label>
                    <textarea defaultValue={editingPurchase?.notes || ''} name="notes" rows={2} className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="Any internal details..."></textarea>
                  </div>
                </div>

                <div className="pt-4 flex gap-4 justify-end">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-xl font-bold text-white/70 hover:text-white hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={isSaving} 
                    type="submit" 
                    className="rounded-xl px-8 py-3 font-bold transition disabled:opacity-50 bg-white text-[#071D2B] hover:bg-[#F1F4F6] hover:scale-[1.01] active:scale-[0.99] shadow-lg"
                  >
                    {isSaving ? 'Saving...' : (editingPurchase ? 'Update Record' : 'Save Record')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
