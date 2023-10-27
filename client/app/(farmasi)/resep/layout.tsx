'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function ResepLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    return (
        <>
            <Button
                className='bg-stone-100 text-stone-700 hover:bg-stone-200 space-x-2'
                size='sm'
                onClick={() => router.back()}
            >
                <FaArrowLeft />
                <span>Kembali</span>
            </Button>

            <section>{children}</section>
        </>
    );
}
