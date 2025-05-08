'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface AuthContextType {
    login: (token: string) => void
    logout: () => void
    isAuthenticated: boolean
    getToken: () => string | undefined
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface SignedInProps {
    children: ReactNode
}

interface SignedOutProps {
    children: ReactNode
}

export function SignedIn({ children }: SignedInProps) {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? <>{children}</> : null
}

export function SignedOut({ children }: SignedOutProps) {
    const { isAuthenticated } = useAuth()
    return !isAuthenticated ? <>{children}</> : null
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Check authentication status on mount and when cookies change
    useEffect(() => {
        const checkAuth = () => {
            const session = Cookies.get('session')
            setIsAuthenticated(session === 'active')
        }

        // Check immediately
        checkAuth()

        // Set up an interval to check periodically
        const interval = setInterval(checkAuth, 1000)

        return () => clearInterval(interval)
    }, [])

    const login = (token: string): void => {
        // Set both the session cookie and the auth token
        Cookies.set('session', 'active', { expires: 7 }) // 7 day session
        Cookies.set('auth_token', token)
        setIsAuthenticated(true)
        window.location.href = '/accounts'
    }

    const logout = (): void => {
        Cookies.remove('session')
        Cookies.remove('auth_token')
        setIsAuthenticated(false)
        router.push('/')
    }

    const getToken = (): string | undefined => {
        return Cookies.get('auth_token')
    }

    return (
        <AuthContext.Provider value={{ login, logout, isAuthenticated, getToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
} 