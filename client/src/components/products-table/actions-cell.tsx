import useProductStatusMutation from '@/hooks/query/products/useProductStatusMutation';
import type { Product, Status } from '@/types/models/product.types';

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
import { Spinner } from '../ui/spinner';
import useProductPaginationParams from '@/hooks/useProductPaginationParams';

const ActionsCell = ({ product }: { product: Product }) => {
    const { productQuery } = useProductPaginationParams();

    const { mutateAsync, isPending } = useProductStatusMutation(productQuery);

    const { id, status } = product;
    const handleChangeStatus = async (status: Status) => {
        await mutateAsync({ id, status });
    };

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
                <DropdownMenuItem onClick={() => console.log(product.title)}>
                    View Details
                </DropdownMenuItem>
                <DropdownMenuItem disabled={status !== 'draft'}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem disabled={status === 'deleted'}>
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {status === 'draft' ? (
                    <DropdownMenuItem
                        onClick={() => handleChangeStatus('active')}
                        disabled={isPending}
                    >
                        Publish {isPending && <Spinner />}
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem
                        onClick={() => handleChangeStatus('draft')}
                        disabled={isPending}
                    >
                        To Drafts {isPending && <Spinner />}
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionsCell;
