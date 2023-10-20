'use client';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import Loading from '@/components/Loading';
import { useResep } from '@/hook/resep';
import { FaEye } from 'react-icons/fa';
import Button from '@/components/Button';

type Resep = {
    nomor: string;
    no_rekam_medis: number;
    pasien: string;
    kunjungan: string;
    dpjp: number;
    pemberi_resep: number;
    tanggal: Date;
    status: number;
};

const columnHelper = createColumnHelper<Resep>();

const columns = [
    columnHelper.accessor('kunjungan', {
        header: 'Kunjungan',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('no_rekam_medis', {
        header: 'No Rekam Medis',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('pasien', {
        header: 'Nama Pasien',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('dpjp', {
        header: 'DPJP',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('pemberi_resep', {
        header: 'Pemberi Resep',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('tanggal', {
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
    columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
            const status = info.getValue();
            if (status === 0) {
                return (
                    <span className='text-white px-1 py-1 border bg-red-700 border-red-700/20 rounded text-xs font-medium shadow-md shadow-red-700/20'>
                        Dibatalkan
                    </span>
                );
            } else if (status === 1) {
                return (
                    <span className='text-white px-1 py-1 border bg-slate-700 border-slate-700/20 rounded text-xs font-medium shadow-md shadow-slate-700/20'>
                        Belum Diterima
                    </span>
                );
            } else if (status === 2) {
                return (
                    <span className='text-white px-1 py-1 border bg-sky-700 border-sky-700/20 rounded text-xs font-medium shadow-md shadow-sky-700/20'>
                        Diterima
                    </span>
                );
            }
        },
    }),
    columnHelper.display({
        id: 'actions',
        cell: (props) => (
            <div className='text-end'>
                <Link href={`resep/${props.row.original.nomor}`}>
                    <Button>
                        <FaEye />
                        <span>Lihat</span>
                    </Button>
                </Link>
            </div>
        ),
    }),
];

const Resep = () => {
    const { resep: data, isLoading } = useResep();

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

            {isLoading ? (
                <Loading />
            ) : (
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
            )}
        </div>
    );
};

export default Resep;
