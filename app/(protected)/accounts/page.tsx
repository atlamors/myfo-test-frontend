import { Suspense } from 'react';
import AccountDetails from './AccountDetails';

export default function AccountsPage() {
    const accountId = 'abc-123';

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">Account Dashboard</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <AccountDetails accountId={accountId} />
            </Suspense>
        </div>
    );
} 