import { statuses } from '@/types/models/product.types';
import z from 'zod';

export const productsFiltersSchema = z.object({
    text: z.string().trim().optional(),
    status: z.enum(statuses).optional(),
    user_id: z.string().trim().optional(),
    dates: z
        .object({
            to: z.date().optional(),
            from: z.date().optional(),
        })
        .optional(),
    dateType: z.enum(['created_at', 'updated_at']).optional(),
});

export type productsFiltersData = z.infer<typeof productsFiltersSchema>;
