export const urlRegex =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=,]*)$/;

export const ACCEPTED_IMAGE_TYPES = new Set([
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]);

export const getAcceptedImageTypesStr = () =>
    Array.from(ACCEPTED_IMAGE_TYPES).join(',');

export const VALIDATION_WRONG_FORMAT =
    'Only .jpg, .jpeg, .png and .webp formats are supported.';

const PSW_MIN = 6;

export const AUTH_SCHEMAS = {
    EMAIL: {
        REQUIRED: 'Email is required',
        INVALID: 'Email is invalid',
    },
    PASSWORD: {
        REQUIRED: 'Password is required',
        MIN: PSW_MIN,
        TOO_SHORT: `Password has to be at least ${PSW_MIN} characters long`,
    },
    CONFIRM_PASSWORD: {
        REQUIRED: 'Password confirmation is required',
        DONT_MATCH: "Password don't match",
    },
} as const;

export const PROFILE_SCHEMAS = {
    FULL_NAME: {
        REQUIRED: 'Full name is required',
    },
    AVATAR: {
        REQUIRED: 'Avatar is required',
        INVALID: VALIDATION_WRONG_FORMAT,
    },
} as const;

export const CODE_LENGTH = 10;

export const TEAMS_SCHEMAS = {
    NAME: {
        REQUIRED: 'Team name is required',
    },
    CODE: {
        REQUIRED: 'Code is required',
        LENGTH: {
            VALUE: CODE_LENGTH,
            ERROR: `Team's code has to be ${CODE_LENGTH} characters long`,
        },
        REGEX: {
            VALUE: /^[A-Z0-9]*$/,
            ERROR: 'String can only contain uppercase letters and numbers.',
        },
    },
} as const;

export const PRODUCTS_SCHEMAS = {
    TITLE: {
        REQUIRED: 'Product title is required',
    },
    DESCRIPTION: {
        REQUIRED: 'Product description is required',
    },
    IMAGE: {
        REQUIRED: 'Image is required',
        INVALID: VALIDATION_WRONG_FORMAT,
    },
} as const;
