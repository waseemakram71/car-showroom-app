'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

export const CarCard = ({ car }) => {
  const tCommon = useTranslations('Common')
  const locale = useLocale()
  const [imgIndex, setImgIndex] = useState(0)

  const nextImg = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setImgIndex((prev) => (prev + 1) % car.images.length)
  }

  const prevImg = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setImgIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
  }

  return (
    <Link
      href={`/${locale}/inventory/${car.slug}`}
      className="group overflow-hidden rounded-2xl border transition hover:-translate-y-1 block"
      style={{ background: '#FFFFFF', borderColor: '#DCE2E6', boxShadow: '0 4px 12px rgba(7,29,43,0.04)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#071D2B'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(7,29,43,0.10)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#DCE2E6'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(7,29,43,0.04)' }}
    >
      <div className="relative aspect-[4/3] overflow-hidden flex items-center justify-center p-6 group/img" style={{ background: '#F1F4F6' }}>
        <img 
          src={car.images[imgIndex]} 
          alt={car.name} 
          className="h-full w-full object-contain transition duration-700 group-hover:scale-110 drop-shadow-md" 
        />
        
        {car.images.length > 1 && (
          <>
            <button 
              onClick={prevImg} 
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 opacity-0 transition-all hover:scale-110 group-hover/img:opacity-100 z-10" 
              style={{ background: 'rgba(7,29,43,0.7)', color: '#F7F8F8' }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button 
              onClick={nextImg} 
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 opacity-0 transition-all hover:scale-110 group-hover/img:opacity-100 z-10" 
              style={{ background: 'rgba(7,29,43,0.7)', color: '#F7F8F8' }}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 z-10">
              {car.images.map((_, i) => (
                <div 
                  key={i} 
                  className="h-1.5 rounded-full transition-all" 
                  style={{ 
                    width: i === imgIndex ? '12px' : '6px',
                    background: i === imgIndex ? '#071D2B' : 'rgba(7,29,43,0.2)' 
                  }} 
                />
              ))}
            </div>
          </>
        )}
        
        <span className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur"
          style={{ background: 'rgba(7,29,43,0.80)', color: '#F7F8F8' }}>
          {car.bodyType}
        </span>
        <span className="absolute bottom-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-black shadow-lg"
          style={{ background: '#071D2B', color: '#F7F8F8' }}>
          {car.price}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-bold" style={{ color: '#091C29' }}>{car.name}</h3>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs" style={{ color: '#63717C' }}>
          <span>{car.year}</span><span>{car.mileage}</span><span>{car.transmission}</span><span>{car.fuelType}</span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t pt-4 text-sm font-bold"
          style={{ borderColor: '#DCE2E6', color: '#091C29' }}>
          <span>{tCommon('viewDetails')}</span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" style={{ color: '#071D2B' }} />
        </div>
      </div>
    </Link>
  )
}

export const CarCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border" style={{ background: '#FFFFFF', borderColor: '#DCE2E6' }}>
      <div className="relative aspect-[4/3] w-full animate-pulse bg-[#F1F4F6]" />
      <div className="p-5">
        <div className="h-6 w-3/4 animate-pulse rounded bg-[#F1F4F6]" />
        <div className="mt-4 flex gap-3">
          <div className="h-4 w-12 animate-pulse rounded bg-[#F1F4F6]" />
          <div className="h-4 w-16 animate-pulse rounded bg-[#F1F4F6]" />
          <div className="h-4 w-14 animate-pulse rounded bg-[#F1F4F6]" />
        </div>
        <div className="mt-5 border-t pt-4" style={{ borderColor: '#DCE2E6' }}>
          <div className="h-4 w-24 animate-pulse rounded bg-[#F1F4F6]" />
        </div>
      </div>
    </div>
  )
}
