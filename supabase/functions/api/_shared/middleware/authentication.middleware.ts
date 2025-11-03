import type { Context, Next } from '@hono/hono';
import getClient from '../config/supabase.ts';
import {
    AppError,
    UnauthorizedError,
} from '../types/middleware/error-handling.types.ts';
import { ContentfulStatusCode } from '@hono/hono/utils/http-status';
import { Database } from '../types/supabase/database.types.ts';
import { AuthError, SupabaseClient } from '@supabase/supabase-js';
import { ERRORS, ERRORS_CODES } from '../constants/errors.constants.ts';
import { assertIsAuth } from '../utils/auth.ts';
import { handleError } from "../utils/handleError.ts";

const { AUTH } = ERRORS_CODES;

export const softAuth = async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.split(' ')[1];

    if (token) {
        const supabase = getClient(token);

        const { data, error } = await supabase.auth.getUser(token);

        if (error) handleJwtError(error);

        if (data?.user) {
            c.set('auth', { token, user: data.user });
        } else {
            c.set('auth', { token, user: undefined });
        }
    } else {
        c.set('auth', { token: undefined, user: undefined });
    }

    await next();
};

const handleJwtError = (error: AuthError) => {
    if (error.code === AUTH.USER_NOT_FOUND || error.code === AUTH.BAD_JWT) {
        return;
    }

    handleError(error);
};

export const requireAuth = async (c: Context, next: Next) => {
    const auth = c.get('auth');
    if (!assertIsAuth(auth)) {
        throw new UnauthorizedError(ERRORS.AUTH.REQUIRED);
    }

    await next();
};
