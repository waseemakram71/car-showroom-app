import './globals.css'
import { SiteNav, Footer, WhatsApp } from '@/components/LayoutComponents'

export const metadata = { title: 'FAM AutoMobile | Cars, Care & Confidence', description: "Karachi's trusted car showroom and repair workshop. Buy, sell, service — all under one roof.", openGraph: { title: 'FAM AutoMobile', description: 'Fair-price car dealing and honest workshop service in Karachi.', type: 'website' } }

export default function RootLayout({ children }) { return <html lang="en"><body><SiteNav /><div className="pt-20">{children}</div><WhatsApp /><Footer /></body></html> }