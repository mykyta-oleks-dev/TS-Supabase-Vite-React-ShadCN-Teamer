import z from '@zod/zod';
import { SCHEMAS } from '../constants/validation.constants.ts';
import { urlRegex } from '../../../_shared/utils/validation.ts';

export const productCreateSchema = z.object({
    title: z.string(SCHEMAS.TITLE.REQUIRED).trim().nonempty(SCHEMAS.TITLE.REQUIRED),
    description: z.string(SCHEMAS.DESCRIPTION.REQUIRED).trim(),
    image: z
        .string(SCHEMAS.IMAGE.REQUIRED)
        .regex(urlRegex, SCHEMAS.IMAGE.INVALID)
        .trim(),
});

export type productCreateData = z.infer<typeof productCreateSchema>;

export const productEditSchema = z.object({
    title: z.string(SCHEMAS.TITLE.REQUIRED).trim().optional(),
    description: z.string(SCHEMAS.DESCRIPTION.REQUIRED).trim().optional(),
    image: z
        .string(SCHEMAS.IMAGE.REQUIRED)
        .regex(urlRegex, SCHEMAS.IMAGE.INVALID)
        .trim()
        .optional(),
});

export type productEditData = z.infer<typeof productEditSchema>;
