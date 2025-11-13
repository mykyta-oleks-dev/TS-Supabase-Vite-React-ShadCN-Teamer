import { getManyProducts } from '@/api/products';
import { KEYS } from '@/constants/query.constants';
import type { GetProductQueryParams, ManyProductsParsed } from '@/types/api';
import { mapProductFromAPI } from '@/types/models/product.types';
import { useQuery } from '@tanstack/react-query';

const useProducts = (params?: GetProductQueryParams) => {
    return useQuery({
        queryKey: KEYS.PRODUCTS(params),
        queryFn: async () => {
            const res = await getManyProducts(params);

            const data: ManyProductsParsed = {
                ...res.data,
                products: res.data.products.map((p) => mapProductFromAPI(p)),
            };

            return data;
        },
        placeholderData: (previousData) => previousData
    });
};

export default useProducts;
