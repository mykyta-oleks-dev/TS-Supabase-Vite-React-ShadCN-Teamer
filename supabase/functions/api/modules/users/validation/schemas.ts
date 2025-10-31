import { z } from '@zod/zod';
import { SCHEMAS } from "../constants/validation.constants.ts";

const { SIGN_UP } = SCHEMAS;
export const signUpSchema = z.object({
	email: z.email(SIGN_UP.EMAIL.INVALID).nonempty(SIGN_UP.EMAIL.REQUIRED),
	password: z.string(SIGN_UP.PASSWORD.REQUIRED)
		.min(SIGN_UP.PASSWORD.MIN, SIGN_UP.PASSWORD.TOO_SHORT)
});

export type signUpData = z.infer<typeof signUpSchema>;
