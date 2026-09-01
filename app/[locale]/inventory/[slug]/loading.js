import { ArrowLeft } from 'lucide-react'

export default function CarDetailLoading() {
  return (
    <main className="min-h-screen pb-24 pt-28">
      <div className="container">
        <div className="inline-flex items-center gap-2 text-sm font-bold opacity-50" style={{ color: '#071D2B' }}>
          <ArrowLeft className="h-4 w-4" /> Back to inventory
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
          <div>
            <div className="aspect-[4/3] w-full rounded-3xl animate-pulse bg-[#F1F4F6]" />
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 rounded-xl border animate-pulse bg-[#F1F4F6]" style={{ borderColor: '#DCE2E6' }} />
              ))}
            </div>
          </div>
          <div className="lg:sticky lg:top-28">
            <div className="h-4 w-32 animate-pulse rounded bg-[#F1F4F6]" />
            <div className="mt-3 h-12 w-3/4 animate-pulse rounded bg-[#F1F4F6]" />
            <div className="mt-4 h-10 w-48 animate-pulse rounded bg-[#F1F4F6]" />
            <div className="mt-7 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-[#F1F4F6]" />
              <div className="h-4 w-full animate-pulse rounded bg-[#F1F4F6]" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-[#F1F4F6]" />
            </div>
            <div className="mt-8 h-48 rounded-2xl animate-pulse bg-[#F1F4F6]" />
          </div>
        </div>
      </div>
    </main>
  )
}
