import {
    ACCEPTED_IMAGE_TYPES,
    PROFILE_SCHEMAS,
} from '@/constants/validation.constants';
import z from 'zod';

export const createProfileSchema = z.object({
    full_name: z.string(PROFILE_SCHEMAS.FULL_NAME.REQUIRED).trim(),
    avatar: z
        .instanceof(File)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.has(file.type),
            PROFILE_SCHEMAS.AVATAR.INVALID
        )
        .nonoptional(PROFILE_SCHEMAS.AVATAR.REQUIRED),
    about: z.string().trim().optional(),
});

export type createProfileData = z.infer<typeof createProfileSchema>;

export const updateProfileSchema = createProfileSchema.extend({
    full_name: z.string(PROFILE_SCHEMAS.FULL_NAME.REQUIRED).trim().optional(),
    avatar: z
        .instanceof(File)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.has(file.type),
            PROFILE_SCHEMAS.AVATAR.INVALID
        )
        .optional(),
});

export type updateProfileData = z.infer<typeof updateProfileSchema>;
