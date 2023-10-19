'use client';

import Loading from '@/components/Loading';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DetailResep = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [detil, setDetil] = useState<any[]>([]);
    const params = useParams();

    const getDetil = async () => {
        setIsLoading(true);

        await axios
            .get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resep/${params.id}/detil`
            )
            .then((response: any) => {
                setDetil(response.data.data[0]);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getDetil();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className='min-h-full flex items-center justify-center'>
                    <Loading />
                </div>
            ) : (
                <>
                    <div className='flex gap-5 mt-10'>
                        <div className='border p-5 rounded-lg border-slate-500 shadow w-full'>
                            <p>No. RM: {detil?.no_rekam_medis}</p>
                            <p>Nama Pasien: {detil?.pasien}</p>
                        </div>
                        <div className='border p-5 rounded-lg border-slate-500 w-full shadow ml-auto'>
                            <p>DPJP: {detil?.dpjp}</p>
                            <p>Pemberi Resep: {detil?.pemberi_resep}</p>
                            <p>Telepon: {detil?.no_hp_pemberi_resep}</p>
                        </div>
                    </div>

                    <div className='relative overflow-x-auto mt-10'>
                        <div className='mb-5 text-right'>
                            <button
                                className='px-3 py-1 border text-white rounded shadow-md text-sm font-medium tracking-wide bg-sky-500 border-sky-500/20 shadow-sky-500/20 hover:bg-sky-600 transition-colors duration-200'
                                onClick={() => console.log('Print clicked')}
                            >
                                Print
                            </button>
                        </div>

                        <table className='w-full text-sm text-left'>
                            <thead className='text-xs bg-gray-600/30'>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>
                                        Nama Obat
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Dosis
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Frekuensi
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Jumlah
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Rute Pemberian
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Keterangan
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 text-center'
                                    >
                                        Waktu
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {detil?.detil?.map((value, index) => (
                                    <tr
                                        className='border-b border-gray-800 hover:bg-gray-900/30 transition-colors duration-75'
                                        key={index}
                                    >
                                        <td className='px-6 py-4'>
                                            {value.nama_obat}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {value.dosis}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {value.frekuensi}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {value.jumlah_obat}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {value.rute_pemberian}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {value.keterangan}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className='flex justify-center'>
                                                <div className='flex items-center mr-4'>
                                                    <input
                                                        id='pagi'
                                                        type='checkbox'
                                                        defaultValue='pagi'
                                                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                                    />
                                                    <label
                                                        htmlFor='pagi'
                                                        className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                                                    >
                                                        Pagi
                                                    </label>
                                                </div>
                                                <div className='flex items-center mr-4'>
                                                    <input
                                                        id='siang'
                                                        type='checkbox'
                                                        defaultValue='siang'
                                                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                                    />
                                                    <label
                                                        htmlFor='siang'
                                                        className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                                                    >
                                                        Siang
                                                    </label>
                                                </div>
                                                <div className='flex items-center mr-4'>
                                                    <input
                                                        id='malam'
                                                        type='checkbox'
                                                        defaultValue='malam'
                                                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                                    />
                                                    <label
                                                        htmlFor='malam'
                                                        className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                                                    >
                                                        Malam
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    );
};

export default DetailResep;
