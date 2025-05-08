import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

async function getAccountData(accountId: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/accounts/${accountId}`, {
            cache: 'no-store',
        });
        if (!res.ok) return {};
        return await res.json();
    } catch {
        return {};
    }
}

export default async function AccountsPage() {
    const accountId = 'abc-123';
    const account = await getAccountData(accountId);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">Account Dashboard</h1>
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