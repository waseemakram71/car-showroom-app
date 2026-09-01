'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import useSWR from 'swr'
import { useTranslations, useLocale } from 'next-intl'
import { CarCard, CarCardSkeleton } from '@/components/CarCard'

const fetcher = url => fetch(url).then(res => res.json())

export default function InventoryPage() { 
  const { data: cars = [], isLoading } = useSWR('/api/cars', fetcher)
  const [query, setQuery] = useState('')
  const [body, setBody] = useState('All')
  
  const t = useTranslations('InventoryPage');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  
  const filtered = useMemo(() => cars.filter((c) => (body === 'All' || c.bodyType === body) && c.name.toLowerCase().includes(query.toLowerCase())), [query, body, cars])
  
  const bodyTypes = ['All', 'Sedan', 'SUV', 'Hatchback'];
  
  return (
    <main className="min-h-screen pb-24 pt-28">
      <div className="container">
        <Link href={`/${locale}`} className="text-sm font-bold transition" style={{ color: '#071D2B' }}
          onMouseEnter={e => e.currentTarget.style.color = '#0D2D40'}
          onMouseLeave={e => e.currentTarget.style.color = '#071D2B'}>
          {t('back')}
        </Link>
        <div className="mt-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow uppercase tracking-[.25em] text-xs font-bold" style={{ color: '#071D2B' }}>{t('eyebrow')}</p>
            <h1 className="section-title mt-3 font-display text-4xl font-bold sm:text-5xl" style={{ color: '#091C29' }}>{t('title')}</h1>
            <p className="mt-4 max-w-xl text-sm leading-7" style={{ color: '#63717C' }}>{t('subtitle')}</p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center rounded-full border px-4" style={{ background: '#FFFFFF', borderColor: '#DCE2E6' }}>
              <Search className="h-4 w-4" style={{ color: '#63717C' }} />
              <input 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder={t('search')} 
                className="w-32 bg-transparent px-2 py-3 text-sm outline-none sm:w-44" 
                style={{ color: '#091C29' }} 
              />
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {bodyTypes.map((type) => (
            <button 
              key={type} 
              onClick={() => setBody(type)} 
              className="rounded-full px-4 py-2 text-xs font-bold transition"
              style={body === type 
                ? { background: '#071D2B', color: '#FFFFFF', border: '1px solid #071D2B' } 
                : { background: 'transparent', color: '#63717C', border: '1px solid #DCE2E6' }}
            >
              {t(type.toLowerCase())}
            </button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CarCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
        
        {!isLoading && filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed py-20 text-center text-sm mt-8" 
            style={{ borderColor: '#DCE2E6', color: '#63717C' }}>
            {t('noMatch')}
          </div>
        )}
      </div>
    </main>
  )
}