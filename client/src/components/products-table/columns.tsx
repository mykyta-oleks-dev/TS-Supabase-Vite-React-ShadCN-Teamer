import { cn } from '@/lib/utils';
import type { Product } from '@/types/models/product.types';
import { type ColumnDef } from '@tanstack/react-table';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import ActionsCell from './actions-cell';

dayjs.extend(localizedFormat);

export const productsColumns: ColumnDef<Product>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'created_at',

        accessorFn: (row) => dayjs(row.created_at).format('lll'),
        header: 'Created At',
    },
    {
        accessorKey: 'updated_at',
        accessorFn: (row) => dayjs(row.updated_at).format('lll'),
        header: 'Updated At',
    },
    {
        accessorKey: 'status',
        cell: ({ row }) => {
            let className = 'text-zinc-500';

            if (row.original.status === 'active') className = 'text-green-500';

            if (row.original.status === 'deleted')
                className = 'text-destructive';

            return (
                <span className={cn('capitalize', className)}>
                    {row.original.status}
                </span>
            );
        },
        header: 'Status',
    },
    {
        id: 'actions',
        cell: ({ row: { original: product } }) => (
            <ActionsCell product={product} />
        ),
    },
];
