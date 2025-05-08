import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = [
    '/',
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
]

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value;

    console.log("[Middleware] Session: ", session);

    // If the user is not authenticated and the route is not public, redirect to the sign-in page
    if (
        session !== 'active' &&
        !publicRoutes.includes(request.nextUrl.pathname)
    ) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all routes except API routes and static files
        '/((?!api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|avif|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
}