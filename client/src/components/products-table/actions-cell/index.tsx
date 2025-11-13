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
import useProductPaginationParams from '@/hooks/useProductPaginationParams';
import DeleteAction from './delete';
import PagesLoader from '@/components/pages-loader';
import { useState } from 'react';

const ActionsCell = ({ product }: { product: Product }) => {
    const [open, setOpen] = useState(false);

    const { productQuery } = useProductPaginationParams();

    const { mutateAsync, isPending } = useProductStatusMutation(productQuery);

    const { id, status } = product;
    
    const handleChangeStatus = async (status: Status) => {
        setOpen(false);

        await mutateAsync({ id, status });
    };

    return (
        <DropdownMenu open={open}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => setOpen(true)}
                >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="relative">
                {isPending && <PagesLoader />}

                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => console.log(product.title)}>
                    View Details
                </DropdownMenuItem>
                <DropdownMenuItem disabled={status !== 'draft'}>
                    Edit
                </DropdownMenuItem>

                <DeleteAction
                    isPending={isPending}
                    onChangeStatus={handleChangeStatus}
                    status={status}
                />

                <DropdownMenuSeparator />
                {status === 'draft' ? (
                    <DropdownMenuItem
                        onClick={() => handleChangeStatus('active')}
                        disabled={isPending}
                    >
                        Publish
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem
                        onClick={() => handleChangeStatus('draft')}
                        disabled={isPending}
                    >
                        To Drafts
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionsCell;
