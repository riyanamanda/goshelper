import { Button } from '@/components/ui/button';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';

export type Resep = {
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

export const columns = [
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
                    <Button className='space-x-2' variant='secondary'>
                        <FaEye />
                        <span>Lihat</span>
                    </Button>
                </Link>
            </div>
        ),
    }),
];
