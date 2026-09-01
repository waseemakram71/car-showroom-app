import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Gauge, Fuel, Settings2 } from 'lucide-react'
import { cars } from '@/lib/cars'

export default async function CarDetail({ params }) {
  const locale = (await params).locale;
  const slug = (await params).slug;
  const car = cars.find((item) => item.slug === slug) || cars[0];
  
  return (
    <main className="min-h-screen pb-24 pt-24">
      <div className="container">
        <Link 
          href={`/${locale}/inventory`} 
          className="inline-flex items-center gap-2 text-sm font-bold text-[#B8C3CA] hover:text-[#FFFFFF] transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to inventory
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
          <div>
            <img src={car.images[0]} alt={car.name} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl" />
            <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl p-4 transition" style={{ background: 'linear-gradient(145deg, #0D2D40 0%, rgba(13, 45, 64, 0.4) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="inline-flex mb-3 rounded-lg p-2" style={{ background: '#FFFFFF', color: '#071D2B' }}>
                  <Gauge className="h-5 w-5" />
                </div>
                <p className="font-bold text-[#FFFFFF]">{car.mileage}</p>
              </div>
              <div className="rounded-xl p-4 transition" style={{ background: 'linear-gradient(145deg, #0D2D40 0%, rgba(13, 45, 64, 0.4) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="inline-flex mb-3 rounded-lg p-2" style={{ background: '#FFFFFF', color: '#071D2B' }}>
                  <Settings2 className="h-5 w-5" />
                </div>
                <p className="font-bold text-[#FFFFFF]">{car.transmission}</p>
              </div>
              <div className="rounded-xl p-4 transition" style={{ background: 'linear-gradient(145deg, #0D2D40 0%, rgba(13, 45, 64, 0.4) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="inline-flex mb-3 rounded-lg p-2" style={{ background: '#FFFFFF', color: '#071D2B' }}>
                  <Fuel className="h-5 w-5" />
                </div>
                <p className="font-bold text-[#FFFFFF]">{car.fuelType}</p>
              </div>
              <div className="rounded-xl p-4 transition" style={{ background: 'linear-gradient(145deg, #0D2D40 0%, rgba(13, 45, 64, 0.4) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="inline-flex mb-3 rounded-lg p-2" style={{ background: '#FFFFFF', color: '#071D2B' }}>
                  <Check className="h-5 w-5" />
                </div>
                <p className="font-bold text-[#FFFFFF]">Inspected</p>
              </div>
            </div>
          </div>
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">{car.year} · {car.bodyType}</p>
            <h1 className="mt-3 font-display text-5xl font-bold" style={{ color: '#FFFFFF' }}>{car.name}</h1>
            <p className="mt-4 font-display text-3xl font-bold" style={{ color: '#F7F8F8' }}>{car.price}</p>
            <p className="mt-7 leading-7 text-[#B8C3CA]">{car.description}</p>
            <div className="mt-8 rounded-2xl p-6" style={{ background: 'linear-gradient(145deg, #0D2D40 0%, rgba(13, 45, 64, 0.4) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h2 className="font-display text-2xl font-bold" style={{ color: '#FFFFFF' }}>Interested in this car?</h2>
              <p className="mt-2 text-sm text-[#B8C3CA]">Ask about availability, financing, or book a test drive.</p>
              <Link 
                href={`/${locale}/contact`} 
                className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: '#FFFFFF', color: '#071D2B' }}
              >
                Inquire now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}