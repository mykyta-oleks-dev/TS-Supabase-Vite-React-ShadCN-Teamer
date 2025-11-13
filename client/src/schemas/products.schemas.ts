import { statuses } from '@/types/models/product.types';
import z from 'zod';

export const productsFiltersSchema = z.object({
    text: z.string().trim().optional(),
    status: z.enum(statuses).optional(),
    user_id: z.string().trim().optional(),
});

export type productsFiltersData = z.infer<typeof productsFiltersSchema>;
