import type { Context, Next } from '@hono/hono';
import getClient from '../config/supabase.ts';
import {
    AppError,
    UnauthorizedError,
} from '../types/middleware/error-handling.types.ts';
import { Auth } from '../types/middleware/authentication.types.ts';
import { ContentfulStatusCode } from '@hono/hono/utils/http-status';
import { Database } from '../types/supabase/database.types.ts';
import { SupabaseClient } from '@supabase/supabase-js';
import { AUTH_ERRORS } from '../constants/auth-errors.constants.ts';

export const softAuth = async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.split(' ')[1];

    if (token) {
        let supabase: SupabaseClient<Database>;
        try {
            supabase = getClient(token);
        } catch (err) {
            console.error(err);
            throw err;
        }

        const { data, error } = await supabase.auth.getUser(token);

        if (error) {
            if (error.code !== AUTH_ERRORS.USER_NOT_FOUND) {
                throw new AppError(
                    error.message,
                    error.status ? (error.status as ContentfulStatusCode) : 500
                );
            }
        }

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

export const requireAuth = async (c: Context, next: Next) => {
    const auth = c.get('auth');
    if (!auth?.user) {
        throw new UnauthorizedError('Authentication required');
    }

    await next();
};
