import { z } from '@zod/zod';
import { SCHEMAS } from '../constants/validation.constants.ts';
import { urlRegex } from '../../../_shared/utils/validation.ts';

const { SIGN_UP, PROFILE } = SCHEMAS;

const emailSchema = z.object({
    email: z.email(SIGN_UP.EMAIL.INVALID).nonempty(SIGN_UP.EMAIL.REQUIRED),
});

const passwordSchema = z.object({
    password: z
        .string(SIGN_UP.PASSWORD.REQUIRED)
        .min(SIGN_UP.PASSWORD.MIN, SIGN_UP.PASSWORD.TOO_SHORT),
});

export const confirmPasswordSchema = passwordSchema
    .extend({
        confirmPassword: z
            .string(SIGN_UP.CONFIRM_PASSWORD.REQUIRED)
            .min(SIGN_UP.PASSWORD.MIN, SIGN_UP.PASSWORD.TOO_SHORT),
    })
    .superRefine((val, ctx) => {
        if (val.password !== val.confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: SIGN_UP.CONFIRM_PASSWORD.DONT_MATCH,
                path: ['confirmPassword'],
            });
        }
    });

export type confirmPasswordData = z.infer<typeof confirmPasswordSchema>;

export const logInSchema = emailSchema.extend(passwordSchema.shape);

export type logInData = z.infer<typeof logInSchema>;

export const signUpSchema = emailSchema
    .extend(confirmPasswordSchema.shape)
    .superRefine((val, ctx) => {
        if (val.password !== val.confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: SIGN_UP.CONFIRM_PASSWORD.DONT_MATCH,
                path: ['confirmPassword'],
            });
        }
    });

export type signUpData = z.infer<typeof signUpSchema>;

export const createProfileSchema = z.object({
    full_name: z
        .string(PROFILE.FULL_NAME.REQUIRED)
        .trim()
        .nonempty(PROFILE.FULL_NAME.REQUIRED),
    avatar: z
        .string(PROFILE.AVATAR.REQUIRED)
        .regex(urlRegex, PROFILE.AVATAR.INVALID),
    about: z.string().trim().optional(),
});

export type createProfileData = z.infer<typeof createProfileSchema>;

export const updateProfileSchema = createProfileSchema.extend({
    full_name: z.string(PROFILE.FULL_NAME.REQUIRED).trim().optional(),
    avatar: z
        .string(PROFILE.AVATAR.REQUIRED)
        .regex(urlRegex, PROFILE.AVATAR.INVALID)
        .optional(),
});

export type updateProfileData = z.infer<typeof updateProfileSchema>;
