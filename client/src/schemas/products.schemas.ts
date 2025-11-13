import { GET_PARAMS } from '@/constants/search-params-keys.constants';
import { statuses } from '@/types/models/product.types';
import z from 'zod';

export const DATE_FIELDS = [
    { value: 'created_at', label: 'Created At' },
    { value: 'updated_at', label: 'Updated At' },
] as const;

export const productsFiltersSchema = z.object({
    [GET_PARAMS.PRODUCT.TEXT]: z.string().trim().optional(),
    [GET_PARAMS.PRODUCT.STATUS]: z.enum(statuses).optional(),
    [GET_PARAMS.PRODUCT.USER_ID]: z.string().trim().optional(),
    [GET_PARAMS.DATES]: z
        .object({
            [GET_PARAMS.TO]: z.date().optional(),
            [GET_PARAMS.FROM]: z.date().optional(),
        })
        .optional(),
    [GET_PARAMS.DATE_TYPE]: z
        .enum(DATE_FIELDS.map((obj) => obj.value))
        .optional(),
});

export type productsFiltersData = z.infer<typeof productsFiltersSchema>;
