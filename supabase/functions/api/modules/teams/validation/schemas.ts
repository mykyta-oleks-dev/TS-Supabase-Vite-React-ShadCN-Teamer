import z from '@zod/zod';
import { SCHEMAS } from '../constants/validation.constants.ts';

const codeReq = z
    .string(SCHEMAS.CODE.REQUIRED)
    .trim()
    .length(SCHEMAS.CODE.LENGTH.VALUE, SCHEMAS.CODE.LENGTH.ERROR)
    .regex(SCHEMAS.CODE.REGEX.VALUE, SCHEMAS.CODE.REGEX.ERROR);

const code = codeReq.optional();

export const codeSchema = z.object({
    code: codeReq,
});

export const teamCreateSchema = z.object({
    name: z
        .string(SCHEMAS.NAME.REQUIRED)
        .trim()
        .nonempty(SCHEMAS.NAME.REQUIRED),
    code,
});

export type teamCreateData = z.infer<typeof teamCreateSchema>;

export const teamEditSchema = z.object({
    name: z.string(SCHEMAS.NAME.REQUIRED).trim().optional(),
    leader_id: z.string().trim().optional(),
    code,
});

export type teamEditData = z.infer<typeof teamEditSchema>;
