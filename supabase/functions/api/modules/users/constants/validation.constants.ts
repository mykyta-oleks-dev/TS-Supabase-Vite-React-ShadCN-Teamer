const PSW_MIN = 6;

export const SCHEMAS = {
    SIGN_UP: {
        EMAIL: {
            REQUIRED: 'Email is required',
            INVALID: 'Email is invalid',
        },
        PASSWORD: {
            REQUIRED: 'Password is required',
            MIN: PSW_MIN,
            TOO_SHORT: `Password has to be at least ${PSW_MIN} characters long`,
        },
    },

    PROFILE: {
        FULL_NAME: {
            REQUIRED: 'Full name is required'
        },
        AVATAR: {
            REQUIRED: 'Avatar public URL is required',
            INVALID: 'Avatar has to be a valid URL',
        }
    }
} as const;
