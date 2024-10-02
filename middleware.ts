// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Define the secret key for JWT
const secret = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  // Get the token (session) if it exists
  const token = await getToken({ req, secret });

  // Get the pathname of the request (e.g., /dashboard)
  const { pathname } = req.nextUrl;

  // Allow the request if:
  // 1) The token exists (user is logged in)
  // 2) It's a request to the login page, API routes, or public assets
  if (token || pathname.startsWith('/login') || pathname.startsWith('/api') || pathname.startsWith('/public')) {
    return NextResponse.next();  // Continue to the requested page
  }

  // If the user is not authenticated, redirect to the login page
  const homePageUrl = new URL('/', req.url);  // Adjust this path to your actual login route
  return NextResponse.redirect(homePageUrl);
}

export const config = {
  // Apply this middleware to the routes you want to protect
  matcher: ['/dashboard/:path*', '/profile/:path*', '/protected/:path*'],
};
