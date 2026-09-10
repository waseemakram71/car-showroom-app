import prisma from '@/lib/prisma'

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-8">Inquiries & Bookings</h1>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead style={{ background: 'linear-gradient(145deg, #071D2B 0%, #0D324A 100%)', color: '#FFFFFF' }}>
            <tr>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Date</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Type</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Name</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Phone</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Email</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {inquiries.map(inquiry => (
              <tr key={inquiry.id} className="hover:bg-muted/20">
                <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                  {inquiry.createdAt.toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${inquiry.type === 'contact' ? 'bg-blue-500/10 text-blue-500' : 'bg-primary/10 text-primary'}`}>
                    {inquiry.type.replace('-', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-foreground">
                  {inquiry.name}
                </td>
                <td className="px-6 py-4 text-muted-foreground text-sm">
                  {inquiry.phone}
                </td>
                <td className="px-6 py-4 text-muted-foreground text-sm">
                  {inquiry.email || '-'}
                </td>
                <td className="px-6 py-4 max-w-xs">
                  {inquiry.carModel && <div className="text-xs font-bold text-foreground mb-1">Model: {inquiry.carModel}</div>}
                  {inquiry.subject && <div className="text-xs font-bold text-foreground mb-1">Subject: {inquiry.subject}</div>}
                  {inquiry.dateNeeded && <div className="text-xs font-bold text-foreground mb-1">Date: {inquiry.dateNeeded}</div>}
                  <div className="text-muted-foreground truncate">{inquiry.message}</div>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">No inquiries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
