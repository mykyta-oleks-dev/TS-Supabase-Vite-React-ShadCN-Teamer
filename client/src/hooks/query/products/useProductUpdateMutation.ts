import { updateProduct } from '@/api/products';
import { KEYS } from '@/constants/query.constants';
import { handleError } from '@/lib/utils';
import type { editProductData } from '@/schemas/products.schemas';
import { uploadFile } from '@/storage';
import type { OneProductParsed } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useProductUpdateMutation = (id: number | undefined) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: editProductData) => {
            if (!id) return;

            const publicUrl =
                values.image && (await uploadFile('products', values.image));

            await updateProduct(id, values, publicUrl);

            return { values, publicUrl };
        },

        onSuccess: (context) => {
            if (!id || !context) return;

            const { values, publicUrl } = context;

            queryClient.setQueryData<OneProductParsed>(
                KEYS.PRODUCT_BY_ID(id),
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        product: {
                            ...old.product,
                            title: values.title ?? old.product.title,
                            description:
                                values.description ?? old.product.description,
                            image: publicUrl ?? old.product.image,
                        },
                    };
                }
            );
        },

        onError: (error) => {
            handleError(error, true);
        },
    });
};

export default useProductUpdateMutation;
