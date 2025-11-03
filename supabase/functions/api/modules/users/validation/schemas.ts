import { z } from '@zod/zod';
import { SCHEMAS } from "../constants/validation.constants.ts";
import { urlRegex } from "../../../_shared/utils/validation.ts";

const { SIGN_UP, PROFILE } = SCHEMAS;
export const authSchema = z.object({
	email: z.email(SIGN_UP.EMAIL.INVALID).nonempty(SIGN_UP.EMAIL.REQUIRED),
	password: z.string(SIGN_UP.PASSWORD.REQUIRED)
		.min(SIGN_UP.PASSWORD.MIN, SIGN_UP.PASSWORD.TOO_SHORT)
});

export type authData = z.infer<typeof authSchema>;

export const profileSchema = z.object({
	full_name: z.string(PROFILE.FULL_NAME.REQUIRED),
	avatar: z.string(PROFILE.AVATAR.REQUIRED).regex(urlRegex, PROFILE.AVATAR.INVALID),
	about: z.string().optional()
})

export type profileData = z.infer<typeof profileSchema>;
