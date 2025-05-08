'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, useAuth } from '@/app/contexts/AuthContext'

export function Navbar() {
    const { logout } = useAuth()

    return (
        <nav className="border-b">
            <div className="container mx-auto flex h-16 items-center px-4 gap-12">
                <Link href="/" className="text-xl font-bold">
                    <Image src="/logo.avif" alt="MyFO Logo" width={100} height={30} />
                </Link>
                <div className="flex flex-grow gap-4">
                    <Link href="/accounts">
                        <Button variant="ghost">Accounts</Button>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <SignedIn>
                        <Button variant="ghost" onClick={logout}>
                            Sign Out
                        </Button>
                    </SignedIn>
                    <SignedOut>
                        <Link href="/sign-in">
                            <Button>Sign In</Button>
                        </Link>
                    </SignedOut>
                </div>
            </div>
        </nav>
    )
} 