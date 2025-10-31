import type { Context, Next } from '@hono/hono';
import getClient from '../config/supabase.ts';
import {
    AppError,
    UnauthorizedError,
} from '../types/middleware/error-handling.types.ts';
import { Auth } from '../types/middleware/authentication.types.ts';
import { ContentfulStatusCode } from '@hono/hono/utils/http-status';

export const softAuth = async (c: Context, next: Next) => {
    const authHeader = c.req.header('authorization');
    const token = authHeader?.split(' ')[1];

    if (token) {
        const supabase = getClient(token);

        const { data, error } = await supabase.auth.getUser(token);

        if (error) {
            throw new AppError(
                error.message,
                error.status ? (error.status as ContentfulStatusCode) : 500
            );
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
    const auth = c.get('auth') as Auth;
    if (!auth?.user) {
        throw new UnauthorizedError('Authentication required');
    }

    await next();
};
