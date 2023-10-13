import Header from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: process.env.APP_NAME,
    description: 'Aplikasi pembantu Sistem Informasi Rumah Sakit',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='id' className='h-full'>
            <body
                className={`${inter.className} antialiased h-full bg-black text-slate-200 flex flex-col`}
            >
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
