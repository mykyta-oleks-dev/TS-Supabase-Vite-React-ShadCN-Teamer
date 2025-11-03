import { ZodSafeParseResult } from '@zod/zod';
import { CreateProfileBody, CreateProfileData } from '../types/body.types.ts';
import { profileData } from './schemas.ts';

export const assertIsProfileData = (
    _body: CreateProfileBody,
    parsed: ZodSafeParseResult<profileData>
): _body is CreateProfileData => {
	if (!parsed.success) return false;
	return true;
};
