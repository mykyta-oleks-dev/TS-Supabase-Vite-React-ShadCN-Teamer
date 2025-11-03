export const CODE_LENGTH = 10;

export const SCHEMAS = {
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
