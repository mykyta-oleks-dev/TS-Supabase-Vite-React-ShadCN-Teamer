import { patchProductStatus } from '@/api/products';
import { KEYS } from '@/constants/query.constants';
import { handleError } from '@/lib/utils';
import type { OneProductParsed } from '@/types/api';
import type { Status } from '@/types/models/product.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useProductStatusMutationDetails = (id: number | undefined) => {
    const queryClient = useQueryClient();

    const key = KEYS.PRODUCT_BY_ID(id);

    return useMutation({
        mutationFn: async (status: Status) => {
            if (!id) return;

            try {
                await patchProductStatus(id, status);
            } catch (error) {
                handleError(error, true);
            }
        },

        onSuccess: async (_data, status) => {
            if (!id) return;

            const query = queryClient.getQueryData<OneProductParsed>(key);

            if (!query) return query;

            queryClient.setQueryData<OneProductParsed>(key, (old) => {
                if (!old) return old;

                return {
                    ...old,
                    product: {
                        ...old.product,
                        status,
                    }
                };
            });

            return query;
        },

        onError: (error) => {
            handleError(error, true);
        },
    });
};

export default useProductStatusMutationDetails;
