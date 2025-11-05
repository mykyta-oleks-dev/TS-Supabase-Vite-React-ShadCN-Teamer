import { ZodSafeParseResult } from '@zod/zod';
import { CreateTeamBody, CreateTeamData } from '../types/request.types.ts';
import { teamCreateData } from './schemas.ts';

export const assertIsTeamData = (
    _body: CreateTeamBody,
    parsed: ZodSafeParseResult<teamCreateData>
): _body is CreateTeamData => {
    if (!parsed.success) return false;
    return true;
};
