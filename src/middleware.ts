import { NextRequest, NextResponse } from 'next/server';

import { performanceMiddleware } from './middleware/performance';

export default function middleware(request: NextRequest) {
  // Apply performance monitoring first
  performanceMiddleware(request);

  // Return NextResponse.next() to continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    '/(dashboard|my-courses)(.*)', // Only protect dashboard and my-courses
    '/(api|trpc)(.*)', // Protect API routes if needed
  ],
};
