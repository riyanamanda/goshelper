'use client';

import Loading from '@/components/Loading';
import { useResep } from '@/hook/resep';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

type Detil = {
    nomor: number;
    pasien: {
        no_rekam_medis: string;
        nama: string;
        jenis_kelamin: string;
        tanggal_lahir: Date;
    };
    dpjp: string;
    pemberi_resep: string;
    no_hp_pemberi_resep: string;
    tanggal_order: Date;
    ruangan: string;
    waktu: any;
};

const Print = () => {
    const [detil, setDetil] = useState<Detil>();
    const { id: no_resep } = useParams();
    const componentRef = useRef(null);
    const { getPrintResep } = useResep();
    const [isLoading, setIsLoading] = useState(true);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        getPrintResep({ no_resep, setDetil, setIsLoading });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='h-full'>
            <div className='text-right mb-5'>
                <button
                    className='px-3 py-0.5 border text-white rounded shadow-xl border-sky-500/30 bg-sky-500 shadow-sky-500/30 font-medium tracking-wide align-middle text-center hover:bg-sky-700 hover:shadow-sky-700/30 hover:border-sky-700/30 transition-colors duration-200'
                    onClick={handlePrint}
                >
                    Print
                </button>
            </div>

            <div className='flex h-full justify-center items-center mt-20'>
                {isLoading ? (
                    <Loading text='Generating Receipt' />
                ) : (
                    <div style={{ fontSize: 11 }} ref={componentRef}>
                        {Object.keys(detil?.waktu).map((key, index) => (
                            <div
                                key={index}
                                className='bg-white p-2 rounded text-black mb-2 w-56 h-64 px-2'
                            >
                                <header className='flex'>
                                    <div className='relative w-16'>
                                        <Image
                                            src={'/pemprov.png'}
                                            alt='pemprov'
                                            fill={true}
                                        />
                                    </div>

                                    <div className='text-center font-bold leading-tight'>
                                        <h1>RS. ERNALDI BAHAR</h1>
                                        <h2
                                            style={{ fontSize: 8 }}
                                            className='-mt-0.5'
                                        >
                                            INSTALASI FARMASI
                                        </h2>
                                        <p
                                            className='font-bold mt-1'
                                            style={{ fontSize: 6 }}
                                        >
                                            Jl. Gubernur H.M. Ali Amin No. 02
                                            RT.020 RW.004 Kel./Kec. Alang-Alang
                                            Lebar, Palembang
                                        </p>
                                    </div>

                                    <div className='relative w-16'>
                                        <Image
                                            src={'/1.png'}
                                            alt='Erba'
                                            fill={true}
                                        />
                                    </div>
                                </header>

                                <div className='w-full border-b border-black my-1'></div>

                                <main className='font-bold'>
                                    <h3
                                        className='text-center mb-1'
                                        style={{ fontSize: 9 }}
                                    >
                                        RAWAT INAP
                                    </h3>

                                    <table>
                                        <tbody className='leading-tight'>
                                            <tr>
                                                <td className='text-slate-900 font-normal'>
                                                    Tgl. Order
                                                </td>
                                                <td className='pl-1'>
                                                    {detil &&
                                                        new Date(
                                                            detil?.tanggal_order
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                            {
                                                                day: '2-digit',
                                                                month: 'long',
                                                                year: 'numeric',
                                                            }
                                                        )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='text-slate-900 font-normal'>
                                                    No. RM
                                                </td>
                                                <td className='pl-1'>
                                                    {
                                                        detil?.pasien
                                                            .no_rekam_medis
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p className='mt-3'>
                                        {detil?.pasien.nama} (
                                        {detil?.pasien.jenis_kelamin}) /{' '}
                                        {detil &&
                                            new Date(
                                                detil?.pasien.tanggal_lahir
                                            ).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                    </p>

                                    <div
                                        className='mt-3'
                                        style={{ fontSize: 9 }}
                                    >
                                        {detil?.waktu[key].map(
                                            (item: any, index: number) => (
                                                <span
                                                    key={index}
                                                    className='font-bold mt-3'
                                                >
                                                    {item.nama_obat},{' '}
                                                </span>
                                            )
                                        )}
                                    </div>

                                    <div className='mt-3'>
                                        <p className='font-medium'>Catatan:</p>
                                        {detil?.waktu[key].map(
                                            (item: any, index: number) => (
                                                <span
                                                    key={index}
                                                    className='font-bold leading-tight'
                                                >
                                                    {item.keterangan},{' '}
                                                </span>
                                            )
                                        )}
                                    </div>

                                    <p className='mt-3 text-center'>
                                        {key.toUpperCase()}
                                    </p>

                                    <div
                                        className='flex items-center justify-between border-b border-black pb-1 mt-4 font-medium'
                                        style={{ fontSize: 8 }}
                                    >
                                        <p>{detil?.dpjp}</p>
                                        <p>{detil?.ruangan}</p>
                                    </div>
                                </main>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Print;
