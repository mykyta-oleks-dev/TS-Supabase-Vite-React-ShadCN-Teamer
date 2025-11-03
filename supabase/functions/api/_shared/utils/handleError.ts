import { AuthError, PostgrestError } from '@supabase/supabase-js';
import {
    AppError,
    BadRequestError,
    ConflictError,
    ForbiddenError,
} from '../types/middleware/error-handling.types.ts';
import {
    ERRORS_CODES,
    AUTH_ERRORS,
    POSTGREST_ERRORS,
} from '../constants/errors.constants.ts';
import { HTTP } from '../constants/http.constants.ts';

export const handleError = (error: unknown) => {
    console.log('handleError', error, typeof error);
    if (error instanceof AppError) throw error;

    if (error instanceof AuthError) handleAuthError(error);

    if (error instanceof PostgrestError) handlePostgrestError(error);

    if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string'
    ) {
        throw new AppError(error.message);
    }

    throw error;
};

const { AUTH, POSTGREST } = ERRORS_CODES;

const handleAuthError = (error: AuthError) => {
    switch (error.code) {
        case AUTH.EMAIL_EXISTS:
        case AUTH.USER_EXISTS:
            throw new ConflictError(AUTH_ERRORS.USER_EXISTS);

        case AUTH.INVALID_CREDENTIALS:
            throw new BadRequestError(AUTH_ERRORS.INVALID_CREDENTIALS);

        default:
            console.log(error.code);
            throw error;
    }
};

const handlePostgrestError = (error: PostgrestError) => {
    switch (error.code) {
        case POSTGREST.CONFLICT:
            throw new ConflictError(POSTGREST_ERRORS.CONFLICT);
        case POSTGREST.FORBIDDEN:
            throw new ForbiddenError(POSTGREST_ERRORS.RLS);
        case POSTGREST.BAD_REQUEST:
            throw new BadRequestError(POSTGREST_ERRORS.BAD_REQUEST);
        default:
            throw new AppError(error.message, HTTP.INTERNAL, {
                code: error.code,
            });
    }
};
