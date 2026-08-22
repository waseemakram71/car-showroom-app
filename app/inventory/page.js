'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(res => res.json())

export default function InventoryPage() { 
  const { data: cars = [], isLoading } = useSWR('/api/cars', fetcher)
  const [query, setQuery] = useState('')
  const [body, setBody] = useState('All')
  
  const filtered = useMemo(() => cars.filter((c) => (body === 'All' || c.bodyType === body) && c.name.toLowerCase().includes(query.toLowerCase())), [query, body, cars])
  
  return <main className="min-h-screen pb-24 pt-28"><div className="container"><Link href="/" className="text-sm font-bold text-primary">← FAM AutoMobile</Link><div className="mt-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Drive something better</p><h1 className="section-title">Our inventory.</h1><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">Every car is inspected, honestly described, and ready for a test drive in Karachi.</p></div><div className="flex gap-2"><div className="flex items-center rounded-full border border-border bg-muted px-4"><Search className="h-4 w-4 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search cars" className="w-32 bg-transparent px-2 py-3 text-sm outline-none sm:w-44" /></div></div></div><div className="mt-10 flex flex-wrap gap-2">{['All', 'Sedan', 'SUV', 'Hatchback'].map((type) => <button key={type} onClick={() => setBody(type)} className={`rounded-full px-4 py-2 text-xs font-bold ${body === type ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground'}`}>{type}</button>)}</div>{isLoading ? <div className="mt-20 text-center text-muted-foreground">Loading cars...</div> : <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((car) => <Link key={car.id} href={`/inventory/${car.slug}`} className="group overflow-hidden rounded-2xl border border-border bg-card"><img src={car.images[0]} alt={car.name} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" /><div className="p-5"><div className="flex justify-between gap-3"><h2 className="font-display text-2xl font-bold">{car.name}</h2><span className="text-sm font-bold text-primary">{car.price}</span></div><p className="mt-3 text-xs text-muted-foreground">{car.year} · {car.mileage} · {car.transmission} · {car.fuelType}</p><p className="mt-5 text-sm font-bold">View details <ArrowRight className="ml-1 inline h-4 w-4 text-primary" /></p></div></Link>)}</div>}{!isLoading && filtered.length === 0 && <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">No cars match your search.</div>}</div></main> }