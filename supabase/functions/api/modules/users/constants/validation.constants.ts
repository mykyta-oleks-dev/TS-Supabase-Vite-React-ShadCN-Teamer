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
} as const;
