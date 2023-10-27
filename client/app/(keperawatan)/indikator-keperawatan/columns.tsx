import { Button } from '@/components/ui/button';
import { createColumnHelper } from '@tanstack/react-table';
import { FaPencilAlt } from 'react-icons/fa';

export type TKeperawatan = {
    id: number;
    deskripsi: string;
    jenis: {
        deskripsi: string;
    };
};

const handleEdit = (id: number) => {
    console.log(`edit button ${id} clicked`);
};

const columnHelper = createColumnHelper<TKeperawatan>();

export const columnsKeperawatan = [
    columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('deskripsi', {
        header: 'Deskripsi',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('jenis', {
        header: 'Jenis',
        cell: (props) => props.row.original.jenis.deskripsi,
    }),
    columnHelper.display({
        id: 'actions',
        cell: (props) => {
            return (
                <div className='text-end'>
                    <Button
                        className='bg-blue-600 font-medium space-x-2 text-xs'
                        size='sm'
                        onClick={() => handleEdit(props.row.original.id)}
                    >
                        <FaPencilAlt />
                        <span>Edit</span>
                    </Button>
                </div>
            );
        },
    }),
];
