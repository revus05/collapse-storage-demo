import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken, COOKIE_NAME } from "@/lib/auth"

const AUTH_PAGES = ["/login", "/register"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static assets and API auth routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  const token = request.cookies.get(COOKIE_NAME)?.value
  const user = token ? await verifyToken(token) : null

  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p))

  // Authenticated user trying to access auth pages → redirect to home
  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Unauthenticated user trying to access protected pages → redirect to login
  if (!isAuthPage && !user) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If token exists but is invalid, clear it
  if (token && !user) {
    const res = NextResponse.redirect(new URL("/login", request.url))
    res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" })
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
