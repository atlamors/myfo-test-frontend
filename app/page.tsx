import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
    return (
        <div className="flex h-full py-24 flex-col items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Welcome to MyFO</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Your family office financial management solution.
                </p>
            </div>
        </div>
    )
}
