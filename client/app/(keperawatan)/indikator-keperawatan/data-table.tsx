import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';

interface IDataTableProps {
    columns: any;
    data: any;
}

export const KeperawatanDataTable = ({ columns, data }: IDataTableProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className='relative overflow-x-auto shadow-md bg-white rounded'>
            <Table className='w-full text-sm text-left'>
                <TableHeader className='text-xs bg-gray-600/30'>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    className='px-6 py-3 text-black'
                                    key={header.id}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow
                            className='border-b border-gray-800 hover:bg-stone-200 transition-colors duration-75'
                            key={row.id}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell className='px-6 py-4' key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className='flex flex-col items-center my-10'>
                {/* Help text */}
                <span className='text-sm text-gray-700'>
                    Page{' '}
                    <span className='font-semibold text-black'>
                        {table.getState().pagination.pageIndex + 1}
                    </span>{' '}
                    of{' '}
                    <span className='font-semibold text-black'>
                        {table.getPageCount()}
                    </span>{' '}
                    Showing{' '}
                    <span className='font-semibold text-black'>
                        {table.getRowModel().rows.length}
                    </span>{' '}
                    Rows
                </span>
                {/* Buttons */}

                <div className='inline-flex mt-2 xs:mt-0'>
                    <button
                        className='flex items-center justify-center px-3 h-8 text-sm font-medium text-black rounded-l hover:bg-slate-300 transition-shadow duration-200'
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Prev
                    </button>

                    <button
                        className='flex items-center justify-center px-3 h-8 text-sm font-medium text-black border-0 border-l border-gray-700 rounded-r hover:bg-slate-300 transition-shadow duration-200'
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
