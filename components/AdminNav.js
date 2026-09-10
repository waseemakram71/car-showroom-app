'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Car, Wrench, MessageSquare, LayoutDashboard, Users } from 'lucide-react'

export function AdminNav({ locale, translations }) {
  const pathname = usePathname()

  const navItems = [
    { label: translations.dashboard, href: `/${locale}/admin`, icon: LayoutDashboard },
    { label: translations.inventory, href: `/${locale}/admin/cars`, icon: Car },
    { label: translations.employees, href: `/${locale}/admin/employees`, icon: Users },
    { label: translations.services, href: `/${locale}/admin/services`, icon: Wrench },
    { label: translations.inquiries, href: `/${locale}/admin/inquiries`, icon: MessageSquare },
  ]

  return (
    <nav className="p-4 space-y-1 flex-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== `/${locale}/admin`)
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition"
            style={isActive
              ? { background: '#0D2D40', color: '#FFFFFF' }
              : { color: '#B8C3CA' }
            }
            onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#FFFFFF' } }}
            onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#B8C3CA' } }}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
