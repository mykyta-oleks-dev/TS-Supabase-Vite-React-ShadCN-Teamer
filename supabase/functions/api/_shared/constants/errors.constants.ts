export const ERRORS = {
    UNEXPECTED: 'Unexpected error',
    AUTH: {
        REQUIRED: 'Authentication is required, provide valid JWT',
        VERIFIED: 'User is already verified',
    },
} as const;

export const ERRORS_CODES = {
    AUTH: {
        USER_NOT_FOUND: 'user_not_found',
        BAD_JWT: 'bad_jwt',
        EMAIL_EXISTS: 'email_exists',
        USER_EXISTS: 'user_already_exists',
        INVALID_CREDENTIALS: 'invalid_credentials',
        NOT_CONFIRMED: 'email_not_confirmed',
    },
    POSTGREST: {
        CONFLICT: '23505',
        FORBIDDEN: '42501',
        BAD_REQUEST: '22P02',
        RAISED_EXCEPTION: 'P0001',
    },
} as const;

export const AUTH_ERRORS = {
    NO_SESSION: 'Could not initialize session with provided token',
    USER_EXISTS: 'User by the specified credentials already exists',
    INVALID_CREDENTIALS: 'Invalid credentials provided for authentication',
    NOT_CONFIRMED: 'Email address is not confirmed',
} as const;

export const POSTGREST_ERRORS = {
    CONFLICT: 'Resource already exists',
    RLS: 'Access denied by RLS',
    BAD_REQUEST: 'Invalid input format',
} as const;
