'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FilterSelect({ value, onChange, options, minWidth = '140px', className = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [ref])

  const selectedOption = options.find(opt => opt.value === value) || options[0]

  return (
    <div className={`relative ${className}`} ref={ref} style={{ minWidth }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 rounded-2xl px-4 py-3 text-sm outline-none transition bg-white border text-[#091C29] text-left"
        style={{
          borderColor: isOpen ? '#0D324A' : '#DCE2E6',
          boxShadow: isOpen ? '0 0 0 2px rgba(13,50,74,0.1)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#0D324A]' : 'text-[#63717C]'}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 py-2 rounded-2xl bg-[#FFFFFF] border border-[#DCE2E6] shadow-[0_10px_25px_rgba(7,29,43,0.1)] overflow-hidden max-h-60 overflow-y-auto" style={{ minWidth: '100%' }}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[#071D2B] hover:text-white ${value === option.value ? 'bg-[#F1F4F6] font-bold text-[#071D2B]' : 'text-[#63717C]'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
