'use client';

import Loading from '@/components/Loading';
import { KeperawatanDataTable } from './data-table';
import { columnsKeperawatan } from './columns';
import { useKeperawatan } from '@/hook/keperawatan';

const Keperawatan = () => {
    const { indikator: data, isLoading } = useKeperawatan();

    return (
        <div className='mt-5'>
            <h1 className='mb-10 font-bold text-md text-center'>
                Daftar Indikaor Asuhan Keperawatan
            </h1>

            {isLoading ? (
                <Loading />
            ) : (
                <KeperawatanDataTable
                    columns={columnsKeperawatan}
                    data={data}
                />
            )}
        </div>
    );
};

export default Keperawatan;
