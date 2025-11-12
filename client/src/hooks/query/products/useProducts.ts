import { getManyProducts } from '@/api/products';
import { KEYS } from '@/constants/query.constants';
import { mapProductFromAPI } from '@/types/models/product.types';
import { useQuery } from '@tanstack/react-query';

const useProducts = () => {
    return useQuery({
        queryKey: KEYS.PRODUCTS(),
        queryFn: async () => {
            const res = await getManyProducts();

            const data = {
                ...res.data,
                products: res.data.products.map((p) => mapProductFromAPI(p)),
            };

            return data;
        },
    });
};

export default useProducts;
