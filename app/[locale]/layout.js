import '../globals.css'
import { SiteNav, Footer, WhatsApp } from '@/components/LayoutComponents'
import { Providers } from '@/components/Providers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export const metadata = { title: 'FAM AutoMobile | Cars, Care & Confidence', description: "Karachi's trusted car showroom and repair workshop. Buy, sell, service — all under one roof.", openGraph: { title: 'FAM AutoMobile', description: 'Fair-price car dealing and honest workshop service in Karachi.', type: 'website' } }

export default async function RootLayout({ children, params }) { 
  const locale = (await params).locale;
  const messages = await getMessages();
  return (
    <html lang={locale} dir={locale === 'ur' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <SiteNav />
            <div className="pt-20 min-h-[calc(100vh-80px)]">{children}</div>
            <WhatsApp />
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  ) 
}