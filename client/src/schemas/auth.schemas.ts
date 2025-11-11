import { z } from 'zod';
import {
    AUTH_SCHEMAS,
} from '../constants/validation.constants';

export const emailSchema = z.object({
    email: z.email(AUTH_SCHEMAS.EMAIL.INVALID).nonempty(AUTH_SCHEMAS.EMAIL.REQUIRED),
});

export type emailData = z.infer<typeof emailSchema>;

const passwordSchema = z.object({
    password: z
        .string(AUTH_SCHEMAS.PASSWORD.REQUIRED)
        .min(AUTH_SCHEMAS.PASSWORD.MIN, AUTH_SCHEMAS.PASSWORD.TOO_SHORT),
});

export const confirmPasswordSchema = passwordSchema
    .extend({
        confirmPassword: z
            .string(AUTH_SCHEMAS.CONFIRM_PASSWORD.REQUIRED)
            .min(AUTH_SCHEMAS.PASSWORD.MIN, AUTH_SCHEMAS.PASSWORD.TOO_SHORT),
    })
    .superRefine((val, ctx) => {
        if (val.password !== val.confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: AUTH_SCHEMAS.CONFIRM_PASSWORD.DONT_MATCH,
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
                message: AUTH_SCHEMAS.CONFIRM_PASSWORD.DONT_MATCH,
                path: ['confirmPassword'],
            });
        }
    });

export type signUpData = z.infer<typeof signUpSchema>;
