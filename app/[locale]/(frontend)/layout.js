import { Footer, WhatsApp } from '@/components/LayoutComponents'

export default function FrontendLayout({ children }) {
  return (
    <>
      <div className="min-h-[calc(100vh-80px)]">
        {children}
      </div>
      <WhatsApp />
      <Footer />
    </>
  )
}
