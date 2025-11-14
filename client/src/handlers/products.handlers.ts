import { createProduct, updateProduct } from '@/api/products';
import queryClient from '@/config/query';
import { KEYS } from '@/constants/query.constants';
import { GET_PARAMS } from '@/constants/search-params-keys.constants';
import { handleError } from '@/lib/utils';
import type {
    createProductData,
    editProductData,
    productsFiltersData,
} from '@/schemas/products.schemas';
import { uploadFile } from '@/storage';
import type { OneProductParsed } from '@/types/api';
import { mapProductFromAPI } from '@/types/models/product.types';
import type { PaginationState } from '@tanstack/react-table';
import type { SetURLSearchParams } from 'react-router';

export const handlePaginationChange = (
    newState: PaginationState,
    setSearchParams: SetURLSearchParams
) => {
    setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        const { pageIndex, pageSize } = newState;

        newParams.set(GET_PARAMS.PAGE, pageIndex + 1 + '');
        newParams.set(GET_PARAMS.LIMIT, pageSize + '');

        return newParams;
    });
};

export const handleFiltersSave = (
    data: productsFiltersData,
    setSearchParams: SetURLSearchParams
) => {
    setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        const { text, status, user_id, dates, date } = data;

        if (text) newParams.set(GET_PARAMS.PRODUCT.TEXT, text);
        else newParams.delete(GET_PARAMS.PRODUCT.TEXT);

        if (status) newParams.set(GET_PARAMS.PRODUCT.STATUS, status);
        else newParams.delete(GET_PARAMS.PRODUCT.STATUS);

        if (user_id) newParams.set(GET_PARAMS.PRODUCT.USER_ID, user_id);
        else newParams.delete(GET_PARAMS.PRODUCT.USER_ID);

        if (dates?.from) {
            dates.from.setHours(0, 0, 0, 0);
            newParams.set(GET_PARAMS.DATE_FROM, dates.from.toISOString());
        } else newParams.delete(GET_PARAMS.DATE_FROM);

        if (dates?.to) {
            dates.to.setHours(23, 59, 59, 999);
            newParams.set(GET_PARAMS.DATE_TO, dates.to.toISOString());
        } else newParams.delete(GET_PARAMS.DATE_TO);

        if ((dates?.from || dates?.to) && date)
            newParams.set(GET_PARAMS.DATE_TYPE, date);
        else newParams.delete(GET_PARAMS.DATE_TYPE);

        return newParams;
    });
};

export const handleCreateProduct = async (values: createProductData) => {
    try {
        const publicUrl = await uploadFile('products', values.image);

        const res = await createProduct(values, publicUrl);

        const productApi = res.data.product;

        const product = mapProductFromAPI(productApi);

        queryClient.setQueryData(KEYS.PRODUCT_BY_ID(product.id), product);

		return product.id;
    } catch (error) {
        handleError(error, true);
    }
};

export const handleUpdateProduct = async (id: number, values: editProductData) => {
    try {
        const publicUrl = values.image && await uploadFile('products', values.image);

        await updateProduct(id, values, publicUrl);

        queryClient.setQueryData<OneProductParsed>(KEYS.PRODUCT_BY_ID(id), (old) => {
            if (!old) return old;

            return {
                ...old,
                product: {
                    ...old.product,
                    title: values.title ?? old.product.title,
                    description: values.description ?? old.product.description,
                    image: publicUrl ?? old.product.image,
                }
            }
        });

		return id;
    } catch (error) {
        handleError(error, true);
    }
};
