'use client';

import Link from 'next/link';
import { useState } from 'react';

type Navigation = {
    id: number;
    name: string;
    url: string;
};

const navigation: Navigation[] = [
    {
        id: 0,
        name: 'Beranda',
        url: '/',
    },
    {
        id: 1,
        name: 'Resep',
        url: '/resep',
    },
    {
        id: 2,
        name: 'Keperawatan',
        url: '/indikator-keperawatan',
    },
];

const Header = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    return (
        <header className='py-5 shadow shadow-slate-700/20'>
            <div className='max-w-7xl px-8 mx-auto flex items-center'>
                <Link href='/' className='w-2/12'>
                    <h1 className='text-xl font-bold'>GosHelper</h1>
                </Link>

                <nav className='text-sm font-medium space-x-10 mx-auto w-8/12 text-center'>
                    {navigation.map((nav) => (
                        <Link
                            href={nav.url}
                            key={nav.id}
                            className={`hover:text-white transition-colors duration-200`}
                        >
                            {nav.name}
                        </Link>
                    ))}
                </nav>

                {isLogin ? (
                    <Link href='/logout' className='ml-auto w-2/12 text-right'>
                        <button className='px-3 py-1 text-xs text-white bg-red-500 font-medium tracking-wide border border-red-500/20 shadow-md shadow-red-500/20 rounded hover:bg-red-700 hover:border-red-700/20 hover:shadow-red-700/20 transition-colors duration-200'>
                            Logout
                        </button>
                    </Link>
                ) : (
                    <Link href='/login' className='ml-auto w-2/12 text-right'>
                        <button className='px-3 py-1 text-xs text-white bg-purple-500 font-medium tracking-wide border border-purple-500/20 shadow-md shadow-purple-500/20 rounded hover:bg-purple-700 hover:border-purple-700/20 hover:shadow-purple-700/20 transition-colors duration-200'>
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
