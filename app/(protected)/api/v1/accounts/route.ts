import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL

if (!BACKEND_URL) {
    throw new Error('BACKEND_URL is not defined')
}

export async function GET(request: NextRequest) {
    try {
        console.log('[GET] /api/v1/accounts request received')
        
        // Get the auth token from cookies
        const token = request.cookies.get('auth_token')?.value

        if (!token) {
            return NextResponse.json(
                { message: 'Authentication required' },
                { status: 401 }
            )
        }

        // Get the account ID from the URL
        const accountId = request.nextUrl.pathname.split('/').pop()

        // Make request to backend
        const response = await fetch(`${BACKEND_URL}/api/v1/accounts/${accountId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || 'Failed to fetch account data' },
                { status: response.status }
            )
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching account data:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
