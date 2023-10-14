'use client';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import mData from '../../../mock_data.json';
import { useState } from 'react';
import Link from 'next/link';

type Person = (typeof mData)[number];

const Resep = () => {
    // const defaultData: Person[] = mData;

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
                <Link href={`resep/${info.getValue()}`}>
                    <button>Detail</button>
                </Link>
            ),
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
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
                                className='border-b border-gray-800'
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
            </div>
        </div>
    );
};

export default Resep;
