export default function ServicesLoading() {
  return (
    <main className="min-h-screen pb-24 pt-28">
      <div className="container">
        <div className="h-4 w-12 animate-pulse rounded bg-[#F1F4F6]"></div>
        <div className="mt-12 max-w-2xl">
          <div className="h-4 w-32 animate-pulse rounded bg-[#F1F4F6]"></div>
          <div className="mt-4 h-12 w-64 animate-pulse rounded bg-[#F1F4F6]"></div>
          <div className="mt-5 h-6 w-96 animate-pulse rounded bg-[#F1F4F6]"></div>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-2xl border p-7" style={{ background: '#FFFFFF', borderColor: '#DCE2E6' }}>
              <div className="h-7 w-7 animate-pulse rounded-full bg-[#F1F4F6]"></div>
              <div className="mt-10 h-8 w-3/4 animate-pulse rounded bg-[#F1F4F6]"></div>
              <div className="mt-3 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-[#F1F4F6]"></div>
                <div className="h-4 w-5/6 animate-pulse rounded bg-[#F1F4F6]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
