'use client';

import Header from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import { ProgressLoader } from 'nextjs-progressloader';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <html lang='id' className='h-full'>
            <meta charSet='utf-8' />
            <meta
                name='viewport'
                content='width=device-width, initial-scale=1'
            />
            <title>{title || 'GosHelper'}</title>

            <body
                className={`${inter.className} antialiased h-full bg-stone-50 text-black flex flex-col`}
                suppressHydrationWarning={true}
            >
                <ProgressLoader />

                <Header />

                <main className='flex-1'>
                    <div className='max-w-7xl px-8 py-3 mx-auto h-full'>
                        {children}
                    </div>
                </main>

                <Footer />
            </body>
        </html>
    );
}
