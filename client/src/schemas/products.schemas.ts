import z from 'zod';

export const productsFiltersSchema = z.object({
    text: z.string().trim().optional(),
});

export type productsFiltersData = z.infer<typeof productsFiltersSchema>;
