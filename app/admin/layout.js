import Link from 'next/link'
import { Car, Wrench, MessageSquare, LayoutDashboard, LogOut } from 'lucide-react'

export const metadata = { title: 'Admin | FAM AutoMobile' }

export default function AdminLayout({ children }) {
  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Inventory', href: '/admin/cars', icon: Car },
    { label: 'Services', href: '/admin/services', icon: Wrench },
    { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  ]

  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="w-64 border-r border-border bg-card">
        <div className="flex h-20 items-center px-6 border-b border-border">
          <Link href="/admin" className="font-display text-xl font-bold">
            FAM <span className="text-primary">Admin</span>
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 w-64 px-4">
          <Link href="/api/auth/signout" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-500/10">
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
