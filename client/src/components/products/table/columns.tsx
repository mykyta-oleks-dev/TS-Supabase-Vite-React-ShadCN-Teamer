import type { Product } from '@/types/models/product.types';
import { type ColumnDef } from '@tanstack/react-table';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import StatusDisplay from '../status';
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
        cell: ({
            row: {
                original: { status },
            },
        }) => <StatusDisplay status={status} />,
        header: 'Status',
    },
    {
        id: 'actions',
        cell: ({ row: { original: product } }) => (
            <ActionsCell product={product} />
        ),
    },
];
