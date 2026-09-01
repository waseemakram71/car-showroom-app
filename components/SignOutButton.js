'use client'

import { useState } from 'react'
import { LogOut, AlertCircle } from 'lucide-react'
import { signOut } from 'next-auth/react'

export const SignOutButton = ({ label }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition"
        style={{ color: '#FFFFFF', background: 'rgba(255,255,255,0.05)' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
      >
        <LogOut className="h-4 w-4 shrink-0" />
        {label}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div 
            className="w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200"
            style={{ background: '#FFFFFF', border: '1px solid #DCE2E6' }}
          >
            <div className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full mb-4" style={{ background: '#F1F4F6' }}>
                <LogOut className="h-6 w-6" style={{ color: '#071D2B' }} />
              </div>
              <h3 className="font-display text-2xl font-bold" style={{ color: '#091C29' }}>
                Sign Out
              </h3>
              <p className="mt-2 text-sm" style={{ color: '#63717C' }}>
                Are you sure you want to sign out of the admin panel?
              </p>
            </div>
            
            <div className="flex gap-3 p-4" style={{ background: '#F8F7F4', borderTop: '1px solid #DCE2E6' }}>
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition"
                style={{ background: 'transparent', color: '#63717C', border: '1px solid #DCE2E6' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#091C29'; e.currentTarget.style.background = '#FFFFFF'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#63717C'; e.currentTarget.style.background = 'transparent'; }}
              >
                Cancel
              </button>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition"
                style={{ background: '#071D2B', color: '#FFFFFF', border: '1px solid #071D2B' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0D2D40'; e.currentTarget.style.borderColor = '#0D2D40'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#071D2B'; e.currentTarget.style.borderColor = '#071D2B'; }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
