import z from 'zod';
import { TEAMS_SCHEMAS } from '../constants/validation.constants.ts';

const codeReq = z
    .string(TEAMS_SCHEMAS.CODE.REQUIRED)
    .trim()
    .length(TEAMS_SCHEMAS.CODE.LENGTH.VALUE, TEAMS_SCHEMAS.CODE.LENGTH.ERROR)
    .regex(TEAMS_SCHEMAS.CODE.REGEX.VALUE, TEAMS_SCHEMAS.CODE.REGEX.ERROR);

const code = codeReq.optional();

export const codeSchema = z.object({
    code: codeReq,
});

export type codeData = z.infer<typeof codeSchema>;

export const teamCreateSchema = z.object({
    name: z
        .string(TEAMS_SCHEMAS.NAME.REQUIRED)
        .trim()
        .nonempty(TEAMS_SCHEMAS.NAME.REQUIRED),
    code,
});

export type teamCreateData = z.infer<typeof teamCreateSchema>;

export const teamEditSchema = z.object({
    name: z.string(TEAMS_SCHEMAS.NAME.REQUIRED).trim().optional(),
    leader_id: z.string().trim().optional(),
    code,
});

export type teamEditData = z.infer<typeof teamEditSchema>;
