import useProductStatusMutationTable from '@/hooks/query/products/useProductStatusMutationTable';
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
import DeleteDialog from './delete';
import PagesLoader from '@/components/pages-loader';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/constants/router.constants';

const ActionsCell = ({ product }: { product: Product }) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const navigate = useNavigate();

    const { productQuery } = useProductPaginationParams();

    const { mutateAsync, isPending } =
        useProductStatusMutationTable(productQuery);

    const { id, status } = product;

    const handleChangeStatus = async (status: Status) => {
        await mutateAsync({ id, status });
    };

    const handleDelete = async () => {
        await handleChangeStatus('deleted');

        setDeleteOpen(false);
    };

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="relative">
                    {isPending && <PagesLoader />}

                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem
                        onClick={() => navigate(ROUTES.PRODUCTS.ONE(id))}
                    >
                        View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={status !== 'draft'}
                        onClick={() => navigate(ROUTES.PRODUCTS.ONE_EDIT(id))}
                    >
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        disabled={status === 'deleted'}
                        onClick={() => setDeleteOpen(true)}
                    >
                        Delete
                    </DropdownMenuItem>

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

            <DeleteDialog
                isPending={isPending}
                onAccept={handleDelete}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />
        </>
    );
};

export default ActionsCell;
