import { ZodSafeParseResult } from '@zod/zod';
import { TeamBody, TeamData } from '../types/body.types.ts';
import { teamData } from './schemas.ts';

export const assertIsTeamData = (
    _body: TeamBody,
    parsed: ZodSafeParseResult<teamData>
): _body is TeamData => {
	if (!parsed.success) return false;
	return true;
};
