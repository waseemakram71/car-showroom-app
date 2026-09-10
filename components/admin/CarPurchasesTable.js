'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash, X, Car, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import FilterSelect from './FilterSelect'

export default function CarPurchasesTable() {
  const router = useRouter()
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPurchase, setEditingPurchase] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  // Filter & Pagination States
  const [searchQuery, setSearchQuery] = useState('')
  const [companyFilter, setCompanyFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

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

  // Filter and Pagination Logic
  const uniqueCompanies = ['all', ...Array.from(new Set(purchases.map(p => p.company))).filter(Boolean)]
  const companyOptions = [
    { value: 'all', label: 'All Companies' },
    ...uniqueCompanies.filter(c => c !== 'all').map(c => ({ value: c, label: c }))
  ]
  const dateOptions = [
    { value: 'all', label: 'All Dates' },
    { value: 'today', label: 'Today' },
    { value: 'this-month', label: 'This Month' },
    { value: 'this-year', label: 'This Year' }
  ]
  const priceOptions = [
    { value: 'all', label: 'All Prices' },
    { value: 'under-1m', label: 'Under 1M' },
    { value: '1m-5m', label: '1M - 5M' },
    { value: '5m-10m', label: '5M - 10M' },
    { value: 'above-10m', label: 'Above 10M' }
  ]

  const filteredPurchases = purchases.filter(purchase => {
    // 1. Search
    const matchesSearch = 
      purchase.carModel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.purchasedFrom?.toLowerCase().includes(searchQuery.toLowerCase());
      
    // 2. Company Filter
    const matchesCompany = companyFilter === 'all' || purchase.company === companyFilter;
    
    // 3. Date Filter
    let matchesDate = true;
    if (dateFilter !== 'all' && purchase.purchaseDate) {
      const pDate = new Date(purchase.purchaseDate);
      const today = new Date();
      if (dateFilter === 'today') {
        matchesDate = pDate.toDateString() === today.toDateString();
      } else if (dateFilter === 'this-month') {
        matchesDate = pDate.getMonth() === today.getMonth() && pDate.getFullYear() === today.getFullYear();
      } else if (dateFilter === 'this-year') {
        matchesDate = pDate.getFullYear() === today.getFullYear();
      }
    }

    // 4. Price Filter
    let matchesPrice = true;
    if (priceFilter !== 'all' && purchase.purchasePrice) {
      const price = parseInt(purchase.purchasePrice);
      if (priceFilter === 'under-1m') matchesPrice = price < 1000000;
      else if (priceFilter === '1m-5m') matchesPrice = price >= 1000000 && price <= 5000000;
      else if (priceFilter === '5m-10m') matchesPrice = price > 5000000 && price <= 10000000;
      else if (priceFilter === 'above-10m') matchesPrice = price > 10000000;
    }

    return matchesSearch && matchesCompany && matchesDate && matchesPrice;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPurchases.length / itemsPerPage))
  const paginatedPurchases = filteredPurchases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, companyFilter, dateFilter, priceFilter])

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold" style={{ color: '#091C29' }}>Car Purchases</h1>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition hover:shadow-lg hover:scale-[1.02] w-full sm:w-auto justify-center"
          style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)', color: '#FFFFFF' }}
        >
          <Plus className="h-4 w-4" /> Add Purchase Record
        </button>
      </div>

      {/* Controls: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search cars by model, company, or seller..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl pl-11 pr-4 py-3 text-sm outline-none transition bg-white border border-[#DCE2E6] focus:border-[#0D324A] focus:ring-2 focus:ring-[#0D324A]/10 shadow-sm text-[#091C29]"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto z-10 relative">
          <FilterSelect value={companyFilter} onChange={setCompanyFilter} options={companyOptions} className="w-full sm:w-auto" minWidth="150px" />
          <FilterSelect value={dateFilter} onChange={setDateFilter} options={dateOptions} className="w-full sm:w-auto" minWidth="140px" />
          <FilterSelect value={priceFilter} onChange={setPriceFilter} options={priceOptions} className="w-full sm:w-auto" minWidth="140px" />
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #DCE2E6', boxShadow: '0 4px 12px rgba(7,29,43,0.06)' }}>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm min-w-[800px]">
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
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse" style={{ borderBottom: '1px solid #DCE2E6' }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gray-200"></div>
                        <div className="h-4 w-32 rounded bg-gray-200"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><div className="h-4 w-24 rounded bg-gray-200"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-28 rounded bg-gray-200"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-24 rounded bg-gray-200"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-20 rounded bg-gray-200"></div></td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      <div className="h-8 w-8 rounded-lg bg-gray-200"></div>
                      <div className="h-8 w-8 rounded-lg bg-gray-200"></div>
                    </td>
                  </tr>
                ))
              ) : filteredPurchases.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center" style={{ color: '#63717C' }}>No matching purchase records found.</td>
                </tr>
              ) : (
                paginatedPurchases.map(purchase => (
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

        {/* Pagination Controls */}
        {!loading && filteredPurchases.length > 0 && (
          <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-[#DCE2E6]">
            <div className="text-[11px] sm:text-sm" style={{ color: '#63717C' }}>
              Showing <span className="font-bold text-[#091C29]">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-bold text-[#091C29]">{Math.min(currentPage * itemsPerPage, filteredPurchases.length)}</span> of <span className="font-bold text-[#091C29]">{filteredPurchases.length}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 sm:p-2 rounded-lg border border-[#DCE2E6] bg-white text-[#071D2B] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
              <span className="flex items-center px-1 sm:px-2 text-[11px] sm:text-sm font-bold whitespace-nowrap" style={{ color: '#091C29' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 sm:p-2 rounded-lg border border-[#DCE2E6] bg-white text-[#071D2B] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        )}
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
