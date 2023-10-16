'use client';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import mData from '../../../mock_data.json';
import { useState } from 'react';
import Link from 'next/link';

type Person = (typeof mData)[number];

const Resep = () => {
    const [data, setData] = useState(() => [...mData]);

    const columnHelper = createColumnHelper<Person>();

    const columns = [
        columnHelper.accessor('nama_pasien', {
            header: 'Pasien',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('dpjp', {
            header: 'DPJP',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('tanggal_order', {
            header: 'Tanggal Order',
            cell: (info) => {
                const date = new Date(info.getValue());
                return Intl.DateTimeFormat('id', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                }).format(date);
            },
        }),
        columnHelper.accessor('nomor', {
            header: '',
            cell: (info) => (
                <div className='text-end'>
                    <Link href={`resep/${info.getValue()}`}>
                        <button className='px-3 py-1 border border-blue-500/20 rounded shadow-lg text-xs text-white bg-blue-500 shadow-blue-500/20 font-medium tracking-wide hover:border-blue-700 hover:shadow-blue-700/20 hover:bg-blue-700 transition-colors duration-200'>
                            Details
                        </button>
                    </Link>
                </div>
            ),
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className='mt-5'>
            <h1 className='mb-10 font-bold text-md text-center'>
                Daftar Resep Rawat Inap
            </h1>
            <div className='relative overflow-x-auto'>
                <table className='w-full text-sm text-left'>
                    <thead className='text-xs bg-gray-600/30'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        scope='col'
                                        className='px-6 py-3'
                                        key={header.id}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                className='border-b border-gray-800 hover:bg-gray-900/30 transition-colors duration-75'
                                key={row.id}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td className='px-6 py-4' key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='flex flex-col items-center my-5'>
                    {/* Help text */}
                    <span className='text-sm text-gray-700 dark:text-gray-400'>
                        Page{' '}
                        <span className='font-semibold text-gray-900 dark:text-white'>
                            {table.getState().pagination.pageIndex + 1}
                        </span>{' '}
                        of{' '}
                        <span className='font-semibold text-gray-900 dark:text-white'>
                            {table.getPageCount()}
                        </span>{' '}
                        Showing{' '}
                        <span className='font-semibold text-gray-900 dark:text-white'>
                            {table.getRowModel().rows.length}
                        </span>{' '}
                        Rows
                    </span>
                    {/* Buttons */}
                    <div className='inline-flex mt-2 xs:mt-0'>
                        <button
                            className='flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Prev
                        </button>
                        <button
                            className='flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resep;
