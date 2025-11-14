import { GET_PARAMS } from '@/constants/search-params-keys.constants';
import {
    ACCEPTED_IMAGE_TYPES,
    PRODUCTS_SCHEMAS,
} from '@/constants/validation.constants';
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

export const createProductSchema = z.object({
    title: z.string(PRODUCTS_SCHEMAS.TITLE.REQUIRED).trim(),
    description: z.string(PRODUCTS_SCHEMAS.DESCRIPTION.REQUIRED).trim(),
    image: z
        .instanceof(File)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.has(file.type),
            PRODUCTS_SCHEMAS.IMAGE.INVALID
        )
        .nonoptional(PRODUCTS_SCHEMAS.IMAGE.REQUIRED),
});

export type createProductData = z.infer<typeof createProductSchema>;

export const editProductSchema = z.object({
    title: z.string(PRODUCTS_SCHEMAS.TITLE.REQUIRED).trim().optional(),
    description: z
        .string(PRODUCTS_SCHEMAS.DESCRIPTION.REQUIRED)
        .trim()
        .optional(),
    image: z
        .instanceof(File)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.has(file.type),
            PRODUCTS_SCHEMAS.IMAGE.INVALID
        )
        .optional(),
});

export type editProductData = z.infer<typeof editProductSchema>;
