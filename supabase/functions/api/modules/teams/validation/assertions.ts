import { ZodSafeParseResult } from '@zod/zod';
import { CreateTeamBody, CreateTeamData } from '../types/body.types.ts';
import { teamCreateData } from './schemas.ts';

export const assertIsTeamData = (
    _body: CreateTeamBody,
    parsed: ZodSafeParseResult<teamCreateData>
): _body is CreateTeamData => {
    if (!parsed.success) return false;
    return true;
};
