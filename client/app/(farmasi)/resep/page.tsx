'use client';

import Loading from '@/components/Loading';
import { useResep } from '@/hook/resep';
import { FarmasiDataTable } from './data-table';
import { columns } from './columns';

const Resep = () => {
    const { resep: data, isLoading } = useResep();

    return (
        <div className='mt-5'>
            <h1 className='mb-10 font-bold text-md text-center'>
                Daftar Resep Rawat Inap
            </h1>

            {isLoading ? (
                <Loading />
            ) : (
                <FarmasiDataTable columns={columns} data={data} />
            )}
        </div>
    );
};

export default Resep;
