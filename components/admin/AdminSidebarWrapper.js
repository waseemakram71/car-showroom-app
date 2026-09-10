'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function AdminSidebarWrapper({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex h-16 shrink-0 items-center justify-between px-6 z-30 overflow-hidden" style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)' }}>
        <img src="/logo.png" alt="FAM AutoMobile" className="h-16 w-auto object-contain mix-blend-screen scale-110 origin-left -ml-2" />
        <button onClick={() => setIsOpen(true)} className="text-white p-2 -mr-2 bg-white/5 rounded-lg hover:bg-white/10 transition">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 md:relative md:translate-x-0 flex flex-col shadow-2xl md:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} 
        style={{ background: 'linear-gradient(160deg, #071D2B 0%, #0D324A 100%)', borderRight: '1px solid rgba(255,255,255,0.08)' }}
      >
        <button 
          onClick={() => setIsOpen(false)} 
          className="md:hidden absolute top-4 right-4 text-white/70 hover:text-white p-2 bg-white/5 rounded-lg hover:bg-white/10 transition z-50"
        >
           <X className="h-5 w-5" />
        </button>
        {children}
      </aside>
    </>
  )
}
