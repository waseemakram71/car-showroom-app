export default function AdminDashboardLoading() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-8" style={{ color: '#091C29' }}>
        Overview
      </h1>
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-6 border border-white/10"
            style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-xl bg-white/10 animate-pulse"></div>
              <div className="h-5 w-24 rounded bg-white/10 animate-pulse"></div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="h-10 w-16 rounded bg-white/10 animate-pulse"></div>
                <div className="mt-2 h-4 w-28 rounded bg-white/10 animate-pulse"></div>
              </div>
              <div className="h-4 w-16 rounded bg-white/10 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
