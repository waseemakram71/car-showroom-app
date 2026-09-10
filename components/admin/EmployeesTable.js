'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Pencil, Trash, X } from 'lucide-react'

export default function EmployeesTable({ locale, translations }) {
  const router = useRouter()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await fetch('/api/employees')
        if (res.ok) {
          const data = await res.json()
          setEmployees(data)
        }
      } catch (err) {
        console.error('Failed to fetch employees:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchEmployees()
  }, [])

  const handleDelete = async (employeeId) => {
    if (!confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
      return
    }

    try {
      const res = await fetch(`/api/employees/${employeeId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setEmployees(prev => prev.filter(e => e.id !== employeeId))
      } else {
        alert('Failed to delete the employee')
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred')
    }
  }

  const handleOpenAdd = () => {
    setEditingEmployee(null)
    setImageFile(null)
    setError('')
    setIsModalOpen(true)
  }

  const handleOpenEdit = (employee) => {
    setEditingEmployee(employee)
    setImageFile(null)
    setError('')
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')
    
    const formData = new FormData(e.target)
    let imageUrl = editingEmployee?.image || ''

    if (imageFile) {
      const uploadData = new FormData()
      uploadData.append('file', imageFile)
      
      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData
        })
        const uploadJson = await uploadRes.json()
        
        if (uploadJson.url) {
          imageUrl = uploadJson.url
        } else {
          setError('Image upload failed')
          setIsSaving(false)
          return
        }
      } catch (err) {
        setError('Image upload error')
        setIsSaving(false)
        return
      }
    }
    
    const employeeData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      role: formData.get('role'),
      salary: formData.get('salary'),
      joiningDate: formData.get('joiningDate'),
      status: formData.get('status'),
      image: imageUrl,
    }

    try {
      const url = editingEmployee ? `/api/employees/${editingEmployee.id}` : '/api/employees'
      const method = editingEmployee ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
      })

      if (res.ok) {
        const savedEmployee = await res.json()
        if (editingEmployee) {
          setEmployees(prev => prev.map(e => e.id === savedEmployee.id ? savedEmployee : e))
        } else {
          setEmployees(prev => [savedEmployee, ...prev])
        }
        setIsModalOpen(false)
        router.refresh()
      } else {
        const errorData = await res.json().catch(() => ({}))
        setError(errorData.error || `Failed to ${editingEmployee ? 'update' : 'add'} employee`)
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
        <h1 className="font-display text-3xl font-bold" style={{ color: '#091C29' }}>{translations.manageEmployees}</h1>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition hover:shadow-lg hover:scale-[1.02]"
          style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)', color: '#FFFFFF' }}
        >
          <Plus className="h-4 w-4" /> {translations.addEmployee}
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #DCE2E6', boxShadow: '0 4px 12px rgba(7,29,43,0.06)' }}>
        <table className="w-full text-left text-sm">
          <thead style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)', color: '#FFFFFF' }}>
            <tr>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">{translations.employee}</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">{translations.role}</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">{translations.salary}</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">{translations.status}</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">{translations.actions}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center" style={{ color: '#63717C' }}>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    Loading...
                  </div>
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center" style={{ color: '#63717C' }}>{translations.noEmployees}</td>
              </tr>
            ) : (
              employees.map(employee => (
                <tr key={employee.id} className="transition hover:bg-gray-50" style={{ borderBottom: '1px solid #DCE2E6' }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {employee.image ? (
                        <img src={employee.image} alt={employee.name} className="h-10 w-10 rounded-full object-cover border border-gray-200" />
                      ) : (
                        <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg text-[#FFFFFF]" style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)' }}>
                          {employee.name ? employee.name.charAt(0).toUpperCase() : '?'}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-base" style={{ color: '#091C29' }}>{employee.name}</div>
                        <div className="text-xs mt-1" style={{ color: '#63717C' }}>{employee.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium" style={{ color: '#071D2B' }}>{employee.role}</td>
                  <td className="px-6 py-4 font-bold" style={{ color: '#071D2B' }}>PKR {employee.salary?.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${employee.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleOpenEdit(employee)}
                      className="inline-flex p-2 rounded-lg transition hover:bg-[#071D2B]/10 hover:scale-110" 
                      style={{ color: '#0D324A' }} 
                      title="Edit employee"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="inline-flex p-2 transition rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 hover:scale-110"
                      title="Delete employee"
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

      {/* Add / Edit Employee Modal */}
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
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative">
                {error && <div className="p-4 bg-red-500/10 text-red-200 rounded-xl text-sm font-bold border border-red-500/20">{error}</div>}
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/90">Name</label>
                    <input required defaultValue={editingEmployee?.name || ''} name="name" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="e.g. Ali Khan" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/90">Phone</label>
                    <input required defaultValue={editingEmployee?.phone || ''} name="phone" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="0300 1234567" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/90">Role / Position</label>
                    <input required defaultValue={editingEmployee?.role || ''} name="role" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="e.g. Senior Mechanic" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/90">Monthly Salary (PKR)</label>
                    <input required type="number" defaultValue={editingEmployee?.salary || ''} name="salary" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" placeholder="75000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/90">Joining Date</label>
                    <input required type="date" defaultValue={editingEmployee?.joiningDate ? new Date(editingEmployee.joiningDate).toISOString().split('T')[0] : ''} name="joiningDate" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition placeholder:text-white/30 text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/90">Status</label>
                    <select defaultValue={editingEmployee?.status || 'active'} name="status" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10">
                      <option value="active" className="bg-[#071D2B]">Active</option>
                      <option value="inactive" className="bg-[#071D2B]">Inactive</option>
                    </select>
                  </div>
                  
                  {/* Image Upload Field */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-white/90">Profile Picture</label>
                    <div className="flex items-center gap-4">
                      {editingEmployee?.image && !imageFile && (
                        <img src={editingEmployee.image} alt="Profile" className="h-12 w-12 rounded-full object-cover border border-white/20" />
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={e => setImageFile(e.target.files[0])} 
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition text-white bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/30 focus:ring-4 focus:ring-white/5 backdrop-blur-sm hover:bg-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer" 
                      />
                    </div>
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
                    {isSaving ? 'Saving...' : (editingEmployee ? 'Update Employee' : 'Save Employee')}
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
