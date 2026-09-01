'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Car, Wrench, MessageSquare, LayoutDashboard, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function AdminSidebarWrapper({ children }) {
  const { data: session } = useSession()
  const pathname = usePathname()

  if (!session) {
    return <>{children}</>
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Inventory', href: '/admin/cars', icon: Car },
    { label: 'Services', href: '/admin/services', icon: Wrench },
    { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  ]

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <aside className="w-64 shrink-0 border-r border-white/10 bg-card hidden md:block">
        <nav className="p-4 space-y-2 sticky top-24">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
          <div className="mt-8 pt-8 border-t border-white/10">
            <Link href="/api/auth/signout" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-500/10">
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </div>
        </nav>
      </aside>
      <main className="flex-1 overflow-hidden min-w-0">
        {children}
      </main>
    </div>
  )
}
