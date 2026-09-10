'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function NewEmployeePage() {
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
    
    const employeeData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      role: formData.get('role'),
      salary: formData.get('salary'),
      joiningDate: formData.get('joiningDate'),
      status: formData.get('status'),
    }

    const res = await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employeeData)
    })

    if (res.ok) {
      router.push(`/${locale}/admin/employees`)
      router.refresh()
    } else {
      setError('Failed to add employee')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto text-[#091C29]">
      <div className="mb-8">
        <Link href={`/${locale}/admin/employees`} className="inline-flex items-center gap-2 text-sm text-[#63717C] hover:text-[#071D2B] mb-4 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Employees
        </Link>
        <h1 className="font-display text-3xl font-bold text-[#071D2B]">Add New Employee</h1>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full opacity-60"></div>
        
        <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-3xl backdrop-blur-2xl bg-[#071D2B]/80 border border-white/10 shadow-[0_8px_32px_rgba(7,29,43,0.2)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-3xl"></div>
          
          {error && <div className="relative p-4 bg-red-500/10 text-red-200 rounded-xl text-sm font-bold border border-red-500/20">{error}</div>}
          
          <div className="relative grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Name</label>
              <input required name="name" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="e.g. Ali Khan" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Phone</label>
              <input required name="phone" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="0300 1234567" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Role / Position</label>
              <input required name="role" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="e.g. Senior Mechanic" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Monthly Salary (PKR)</label>
              <input required type="number" name="salary" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="75000" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Joining Date</label>
              <input required type="date" name="joiningDate" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Status</label>
              <select name="status" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10">
                <option value="active" className="bg-[#071D2B]">Active</option>
                <option value="inactive" className="bg-[#071D2B]">Inactive</option>
              </select>
            </div>
          </div>

          <button disabled={loading} type="submit" className="relative w-full rounded-xl px-4 py-4 font-bold transition disabled:opacity-50 bg-white text-[#071D2B] hover:bg-[#F1F4F6] hover:scale-[1.01] active:scale-[0.99] shadow-lg">
            {loading ? 'Saving...' : 'Save Employee'}
          </button>
        </form>
      </div>
    </div>
  )
}
