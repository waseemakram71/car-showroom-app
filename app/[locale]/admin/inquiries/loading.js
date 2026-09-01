export default function AdminInquiriesLoading() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-8" style={{ color: '#091C29' }}>Inquiries & Bookings</h1>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #DCE2E6', boxShadow: '0 4px 12px rgba(7,29,43,0.06)' }}>
        <table className="w-full text-left text-sm">
          <thead style={{ background: '#071D2B', color: '#FFFFFF' }}>
            <tr>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Date</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Type</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Contact Info</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Details</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} style={{ borderBottom: '1px solid #DCE2E6' }}>
                <td className="px-6 py-4">
                  <div className="h-4 w-24 animate-pulse rounded bg-[#F1F4F6]"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-[#F1F4F6]"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-[#F1F4F6]"></div>
                    <div className="h-3 w-24 animate-pulse rounded bg-[#F1F4F6]"></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="h-4 w-full max-w-[200px] animate-pulse rounded bg-[#F1F4F6]"></div>
                    <div className="h-3 w-full max-w-[300px] animate-pulse rounded bg-[#F1F4F6]"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
