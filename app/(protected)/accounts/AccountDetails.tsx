'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

interface Account {
    accountName?: string;
    accountId?: string;
    balance?: number;
    currency?: string;
    accountType?: string;
}

async function fetchAccountData(accountId: string, token: string) {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/v1/accounts/${accountId}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  
        },
    });

    if (!res.ok) {
        console.error('Failed to fetch account data:', res.status);
        return {};
    }

    return await res.json();
}

export default function AccountDetails({ accountId }: { accountId: string }) {
    const { getToken } = useAuth();
    const [account, setAccount] = useState<Account>({});

    useEffect(() => {
        const token = getToken();
        if (token) {
            fetchAccountData(accountId, token).then(setAccount);
        }
    }, [accountId, getToken]);

    return (
        <div>
            <Card className="w-full mb-8">
                <CardHeader>
                    <CardTitle className="text-2xl">{account.accountName ?? 'undefined'}</CardTitle>
                    <CardDescription>ID: {account.accountId ?? 'undefined'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="text-muted-foreground text-sm mb-1">Balance</div>
                            <div className="text-2xl font-bold">
                                {account.balance !== undefined && account.currency
                                    ? account.balance.toLocaleString(undefined, { style: 'currency', currency: account.currency })
                                    : 'undefined'}
                            </div>
                        </div>
                        <div>
                            <div className="text-muted-foreground text-sm mb-1">Account Type</div>
                            <div className="text-2xl font-bold">{account.accountType ?? 'undefined'}</div>
                        </div>
                        <div>
                            <div className="text-muted-foreground text-sm mb-1">Currency</div>
                            <div className="text-2xl font-bold">{account.currency ?? 'undefined'}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-xl">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-32 flex items-center justify-center text-muted-foreground">
                        [Transactions Placeholder]
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 