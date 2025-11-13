import { getOneProduct } from '@/api/products';
import { KEYS } from '@/constants/query.constants';
import type { OneProductParsed } from '@/types/api';
import { mapProductFromAPI } from '@/types/models/product.types';
import { useQuery } from '@tanstack/react-query';

const useOneProduct = (id: number | undefined) => {
	return useQuery({
		queryKey: KEYS.PRODUCT_BY_ID(id),
		queryFn: async () => {
			if (!id) return null;
			
			const res = await getOneProduct(id);

			const data: OneProductParsed = {
				...res.data,
				product: mapProductFromAPI(
					res.data.product
				),
			};

			return data;
		},
	});
};

export default useOneProduct;
