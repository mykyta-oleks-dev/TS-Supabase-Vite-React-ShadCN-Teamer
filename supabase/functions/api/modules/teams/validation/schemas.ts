import z from '@zod/zod';
import { SCHEMAS } from '../constants/validation.constants.ts';

const codeSchema = z.object({
    code: z
        .string(SCHEMAS.CODE.REQUIRED)
        .trim()
        .length(SCHEMAS.CODE.LENGTH.VALUE, SCHEMAS.CODE.LENGTH.ERROR)
        .regex(SCHEMAS.CODE.REGEX.VALUE, SCHEMAS.CODE.REGEX.ERROR)
        .optional(),
});

export const teamCreateSchema = codeSchema.extend({
    name: z.string(SCHEMAS.NAME.REQUIRED).trim(),
});

export type teamCreateData = z.infer<typeof teamCreateSchema>;

export const teamEditSchema = codeSchema.extend({
    name: z.string(SCHEMAS.NAME.REQUIRED).trim().optional(),
    leader_id: z.string().trim().optional()
});

export type teamEditData = z.infer<typeof teamEditSchema>;
