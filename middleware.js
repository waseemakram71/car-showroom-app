import { withAuth } from "next-auth/middleware"
import createMiddleware from 'next-intl/middleware'

const publicPages = ['/', '/login', '/inventory', '/services', '/about', '/contact']
const intlMiddleware = createMiddleware({
  locales: ['en', 'ur'],
  defaultLocale: 'en'
})

const authMiddleware = withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.includes("/admin") && req.nextauth.token?.role !== "admin") {
      return Response.redirect(new URL("/login", req.url))
    }
    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login'
    }
  }
)

export default function middleware(req) {
  const publicPathnameRegex = RegExp(
    `^(/([a-z]{2}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i'
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage || req.nextUrl.pathname.startsWith('/api') || req.nextUrl.pathname.startsWith('/_next')) {
    return intlMiddleware(req)
  } else {
    return authMiddleware(req, {
      ...req,
      // Pass headers correctly if needed, but standard request object works
    })
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
