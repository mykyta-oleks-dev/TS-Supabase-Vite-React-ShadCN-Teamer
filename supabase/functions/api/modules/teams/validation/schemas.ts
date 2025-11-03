import z from '@zod/zod';
import { SCHEMAS } from '../constants/validation.constants.ts';

export const teamEditSchema = z.object({
    name: z.string(SCHEMAS.NAME.REQUIRED).trim(),
});

export type teamEditData = z.infer<typeof teamSchema>;

export const teamSchema = teamEditSchema.extend({
    code: z
        .string(SCHEMAS.CODE.REQUIRED)
        .trim()
        .length(SCHEMAS.CODE.LENGTH.VALUE, SCHEMAS.CODE.LENGTH.ERROR)
        .regex(SCHEMAS.CODE.REGEX.VALUE, SCHEMAS.CODE.REGEX.ERROR)
		.optional(),
});

export type teamData = z.infer<typeof teamSchema>;
