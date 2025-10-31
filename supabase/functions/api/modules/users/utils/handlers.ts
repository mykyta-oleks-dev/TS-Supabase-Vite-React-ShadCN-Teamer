import { AuthError } from '@supabase/supabase-js';
import { AUTH_ERRORS } from '../../../_shared/constants/auth-errors.constants.ts';
import { ConflictError } from '../../../_shared/types/middleware/error-handling.types.ts';
import { ERRORS } from '../constants/errors.constants.ts';

export const handleAuthError = (error: AuthError) => {
    if (
        error.code == AUTH_ERRORS.EMAIL_EXISTS ||
        error.code == AUTH_ERRORS.USER_EXISTS
    ) {
        throw new ConflictError(ERRORS.REQUEST.USER_EXISTS);
    }

    throw error;
};
