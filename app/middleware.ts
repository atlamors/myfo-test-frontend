import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value

    // If we have a session, allow access to everything
    if (session === 'active') {
        return NextResponse.next()
    }

    // If we don't have a session, redirect to sign-in
    return NextResponse.redirect(new URL('/sign-in', request.url))
}

export const config = {
    matcher: ['/accounts/:path*', '/sign-in'],
} 