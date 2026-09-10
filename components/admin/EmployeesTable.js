'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Pencil, Trash, X, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import FilterSelect from './FilterSelect'

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

  // Filter & Pagination States
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

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

  // Filter and Pagination Logic
  const uniqueRoles = ['all', ...Array.from(new Set(employees.map(e => e.role))).filter(Boolean)]
  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    ...uniqueRoles.filter(r => r !== 'all').map(r => ({ value: r, label: r }))
  ]
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.phone?.includes(searchQuery) ||
      employee.role?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || employee.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  })

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / itemsPerPage))
  const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, roleFilter, statusFilter])

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold" style={{ color: '#091C29' }}>{translations.manageEmployees}</h1>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition hover:shadow-lg hover:scale-[1.02] w-full sm:w-auto justify-center"
          style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)', color: '#FFFFFF' }}
        >
          <Plus className="h-4 w-4" /> {translations.addEmployee}
        </button>
      </div>

      {/* Controls: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search employees by name, phone, or role..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl pl-11 pr-4 py-3 text-sm outline-none transition bg-white border border-[#DCE2E6] focus:border-[#0D324A] focus:ring-2 focus:ring-[#0D324A]/10 shadow-sm text-[#091C29]"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <FilterSelect value={roleFilter} onChange={setRoleFilter} options={roleOptions} className="w-full sm:w-auto" minWidth="160px" />
          <FilterSelect value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="w-full sm:w-auto" minWidth="140px" />
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #DCE2E6', boxShadow: '0 4px 12px rgba(7,29,43,0.06)' }}>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm min-w-[800px]">
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
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse" style={{ borderBottom: '1px solid #DCE2E6' }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                        <div className="space-y-2">
                          <div className="h-4 w-32 rounded bg-gray-200"></div>
                          <div className="h-3 w-20 rounded bg-gray-200"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><div className="h-4 w-24 rounded bg-gray-200"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-28 rounded bg-gray-200"></div></td>
                    <td className="px-6 py-4"><div className="h-6 w-16 rounded-full bg-gray-200"></div></td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      <div className="h-8 w-8 rounded-lg bg-gray-200"></div>
                      <div className="h-8 w-8 rounded-lg bg-gray-200"></div>
                    </td>
                  </tr>
                ))
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center" style={{ color: '#63717C' }}>No matching employees found.</td>
                </tr>
              ) : (
                paginatedEmployees.map(employee => (
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
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${employee.status === 'active' ? 'bg-emerald-600 text-white' : 'bg-red-500 text-white'}`}>
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
        
        {/* Pagination Controls */}
        {!loading && filteredEmployees.length > 0 && (
          <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-[#DCE2E6]">
            <div className="text-[11px] sm:text-sm" style={{ color: '#63717C' }}>
              Showing <span className="font-bold text-[#091C29]">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-bold text-[#091C29]">{Math.min(currentPage * itemsPerPage, filteredEmployees.length)}</span> of <span className="font-bold text-[#091C29]">{filteredEmployees.length}</span>
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
