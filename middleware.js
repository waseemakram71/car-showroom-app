import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // If a user tries to access an admin route but doesn't have the 'admin' role, redirect to home or login
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin") {
      return Response.redirect(new URL("/login", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}
