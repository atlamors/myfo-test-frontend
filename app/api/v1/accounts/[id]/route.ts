import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL

if (!BACKEND_URL) {
    throw new Error('BACKEND_URL is not defined')
}

type Params = { params: { id: string } };

export async function GET(
    request: NextRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
) {
    try {
        const { params } = context as Params;
        const { id: accountId } = await params;
        console.log('GET [/api/v1/accounts] req for account:', accountId)
        
        // Get the auth token from headers
        const authHeader = request.headers.get('Authorization');
        const token = authHeader ? authHeader.replace('Bearer ', '') : null;
        console.log('[/api/v1/accounts] token', token);

        if (!token) {
            return NextResponse.json(
                { message: 'Authentication required' },
                { status: 401 }
            )
        }

        if (!accountId) {
            return NextResponse.json(
                { message: 'Account ID is required' },
                { status: 400 }
            )
        }

        // Make request to backend
        const response = await fetch(`${BACKEND_URL}/api/v1/accounts/${accountId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            console.error(`Backend request failed: ${response.status} ${response.statusText}`)
            const data = await response.json().catch(() => ({}))
            return NextResponse.json(
                { message: data.message || 'Failed to fetch account data' },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching account data:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
} 