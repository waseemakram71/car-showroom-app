import { Plus } from 'lucide-react'

export default function AdminServicesLoading() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="h-9 w-64 animate-pulse rounded bg-[#DCE2E6]"></div>
        <div className="flex items-center gap-2 rounded-full px-5 py-2.5 opacity-50"
          style={{ background: '#071D2B', color: '#FFFFFF' }}
        >
          <Plus className="h-4 w-4" /> Add Service
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #DCE2E6', boxShadow: '0 4px 12px rgba(7,29,43,0.06)' }}>
        <table className="w-full text-left text-sm">
          <thead style={{ background: '#071D2B', color: '#FFFFFF' }}>
            <tr>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Service Title</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Description</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} style={{ borderBottom: '1px solid #DCE2E6' }}>
                <td className="px-6 py-4">
                  <div className="h-5 w-48 animate-pulse rounded bg-[#F1F4F6]"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-[#F1F4F6]"></div>
                    <div className="h-4 w-3/4 animate-pulse rounded bg-[#F1F4F6]"></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end">
                    <div className="h-8 w-8 animate-pulse rounded-lg bg-[#F1F4F6]"></div>
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
