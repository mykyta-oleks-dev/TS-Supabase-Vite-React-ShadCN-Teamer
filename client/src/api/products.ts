import axiosInstance from '@/config/axios';
import { API } from '@/constants/api.constants';
import type { createProductData } from '@/schemas/products.schemas';
import {
    type GetProductQueryParams,
    type ManyProducts,
    type OneProduct,
} from '@/types/api';
import type { Status } from '@/types/models/product.types';

export const getManyProducts = (params?: GetProductQueryParams) =>
    axiosInstance.get<ManyProducts>(API.PRODUCTS.ROOT, { params });

export const getOneProduct = (id: number) =>
    axiosInstance.get<OneProduct>(API.PRODUCTS.ONE(id));

export const patchProductStatus = (id: number, status: Status) =>
    axiosInstance.patch(API.PRODUCTS.CHANGE_STATUS(id), { status });

export const createProduct = (values: createProductData, image: string) =>
    axiosInstance.post<OneProduct>(API.PRODUCTS.ROOT, { ...values, image });
