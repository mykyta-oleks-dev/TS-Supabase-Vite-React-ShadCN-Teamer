import { patchProductStatus } from '@/api/products';
import { KEYS } from '@/constants/query.constants';
import { handleError } from '@/lib/utils';
import type { GetProductQueryParams, ManyProductsParsed } from '@/types/api';
import type { Status } from '@/types/models/product.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useProductStatusMutation = (params?: GetProductQueryParams) => {
    const queryClient = useQueryClient();

    const key = KEYS.PRODUCTS(params);

    return useMutation({
        mutationFn: async ({ id, status }: { id: number; status: Status }) => {
            try {
                await patchProductStatus(id, status);
            } catch (error) {
                handleError(error, true);
            }
        },

        onMutate: async ({ id, status }) => {
            console.log({ id, status, key });

            const query = queryClient.getQueryData<ManyProductsParsed>(key);

            if (!query) return query;

            console.log({ query });

            queryClient.setQueryData<ManyProductsParsed>(key, (old) => {
                if (!old) return old;

                const product = old.products.find((p) => p.id === id);

                console.log({ old, product });

                if (!product) return old;

                const oldStatus = product.status;

                const newProducts = old.products.map((p) => {
                    if (p.id !== id) return p;

                    return {
                        ...p,
                        status,
                    };
                });

                console.log({
                    old: product,
                    new: newProducts.find((p) => p.id === id),
                });

                let totalDeleted = old.totalDeleted;
                let totalDrafts = old.totalDrafts;

                if (oldStatus !== status) {
                    if (oldStatus === 'deleted') totalDeleted--;
                    if (oldStatus === 'draft') totalDrafts--;

                    if (status === 'deleted') totalDeleted++;
                    if (status === 'draft') totalDrafts++;
                }

                return {
                    ...old,
                    products: newProducts,
                    totalDeleted,
                    totalDrafts,
                };
            });

            return query;
        },

        onError: (error, _variables, context) => {
            handleError(error, true);
            if (context) {
                queryClient.setQueryData<ManyProductsParsed>(key, context);
            }
        },
    });
};

export default useProductStatusMutation;
