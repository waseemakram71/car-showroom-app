'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Car, Wrench, MessageSquare, LayoutDashboard } from 'lucide-react'

export function AdminNav({ locale, translations }) {
  const pathname = usePathname()
  
  const navItems = [
    { label: translations.dashboard, href: `/${locale}/admin`, icon: LayoutDashboard },
    { label: translations.inventory, href: `/${locale}/admin/cars`, icon: Car },
    { label: translations.services, href: `/${locale}/admin/services`, icon: Wrench },
    { label: translations.inquiries, href: `/${locale}/admin/inquiries`, icon: MessageSquare },
  ]

  return (
    <nav className="p-4 space-y-2 flex-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`) && item.href !== `/${locale}/admin`
        const Icon = item.icon
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
