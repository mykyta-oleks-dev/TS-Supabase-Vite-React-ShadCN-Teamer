import { Context } from '@hono/hono';
import { ERRORS } from "../constants/errors.constants.ts";
import { Auth, AuthPartial } from '../types/middleware/authentication.types.ts';
import { UnauthorizedError } from "../types/middleware/error-handling.types.ts";

export const assertIsAuth = (auth: AuthPartial): auth is Auth => {
    if (auth.token && auth.user) return true;
    return false;
};

export const getAuthOrThrow = (c: Context) => {
    const auth = c.get('auth');

    if (!assertIsAuth(auth)) {
        throw new UnauthorizedError(ERRORS.AUTH.REQUIRED);
    }

    return auth;
};
