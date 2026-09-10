'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function EditEmployeePage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale
  const id = params.id

  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const res = await fetch(`/api/employees/${id}`)
        if (res.ok) {
          const data = await res.json()
          setEmployee({
            ...data,
            joiningDate: data.joiningDate ? new Date(data.joiningDate).toISOString().split('T')[0] : ''
          })
        } else {
          setError('Employee not found')
        }
      } catch (err) {
        setError('Failed to load employee')
      } finally {
        setLoading(false)
      }
    }
    fetchEmployee()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
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

    const res = await fetch(`/api/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employeeData)
    })

    if (res.ok) {
      router.push(`/${locale}/admin/employees`)
      router.refresh()
    } else {
      setError('Failed to update employee')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-6 w-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="text-center py-12 text-[#63717C]">
        {error || 'Employee not found'}
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto text-[#091C29]">
      <div className="mb-8">
        <Link href={`/${locale}/admin/employees`} className="inline-flex items-center gap-2 text-sm text-[#63717C] hover:text-[#071D2B] mb-4 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Employees
        </Link>
        <h1 className="font-display text-3xl font-bold text-[#071D2B]">Edit Employee</h1>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full opacity-60"></div>
        
        <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-3xl backdrop-blur-2xl bg-[#071D2B]/80 border border-white/10 shadow-[0_8px_32px_rgba(7,29,43,0.2)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-3xl"></div>
          
          {error && <div className="relative p-4 bg-red-500/10 text-red-200 rounded-xl text-sm font-bold border border-red-500/20">{error}</div>}
          
          <div className="relative grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Name</label>
              <input required defaultValue={employee.name} name="name" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Phone</label>
              <input required defaultValue={employee.phone} name="phone" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Role / Position</label>
              <input required defaultValue={employee.role} name="role" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Monthly Salary (PKR)</label>
              <input required defaultValue={employee.salary} type="number" name="salary" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Joining Date</label>
              <input required defaultValue={employee.joiningDate} type="date" name="joiningDate" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/90">Status</label>
              <select defaultValue={employee.status} name="status" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10">
                <option value="active" className="bg-[#071D2B]">Active</option>
                <option value="inactive" className="bg-[#071D2B]">Inactive</option>
              </select>
            </div>
          </div>

          <button disabled={saving} type="submit" className="relative w-full rounded-xl px-4 py-4 font-bold transition disabled:opacity-50 bg-white text-[#071D2B] hover:bg-[#F1F4F6] hover:scale-[1.01] active:scale-[0.99] shadow-lg">
            {saving ? 'Updating...' : 'Update Employee'}
          </button>
        </form>
      </div>
    </div>
  )
}
