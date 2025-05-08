import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL;

if (!BACKEND_URL) {
    throw new Error('BACKEND_URL is not defined');
}

export async function POST(request: NextRequest) {
    console.log(`POST [/api/v1/auth] req`);
    try {
        const req = await request.json();
        const { email, password } = req;

        const body = {
            email: email,
            password: password
        }

        const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json({ token: data.token });
        }

        return NextResponse.json(
            { message: data.message || 'Invalid credentials' },
            { status: response.status }
        );
    } catch (error) {
        console.error('Authentication error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
