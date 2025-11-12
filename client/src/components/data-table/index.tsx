import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    type PaginationState,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from './pagination';
import type { GetQueryParams } from '@/types/api';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pages: number;
    params: GetQueryParams;
    onPaginationChange: (newState: PaginationState) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pages,
    params,
    onPaginationChange: handlePaginationChange,
}: Readonly<DataTableProps<TData, TValue>>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: pages,
        state: {
            pagination: {
                pageIndex: params.page - 1,
                pageSize: params.limit,
            },
        },
        onPaginationChange: (updater) => {
            if (typeof updater !== 'function') return;

            const old = table.getState().pagination;

            const newPagination = updater(old);

            handlePaginationChange(newPagination);
        },
    });

    return (
        <div className="overflow-hidden rounded-md border pb-2">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <DataTablePagination table={table} />
        </div>
    );
}
