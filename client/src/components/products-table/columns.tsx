import { cn } from '@/lib/utils';
import type { Product } from '@/types/models/product.types';
import { type ColumnDef } from '@tanstack/react-table';

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

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
        cell: ({ row: { original: product } }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => console.log(product.title)}
                        >
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={product.status !== 'draft'}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            disabled={product.status === 'deleted'}
                        >
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            {product.status === 'draft' ? 'Publish' : 'Hide'}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
