import { Auth, AuthPartial } from "../types/middleware/authentication.types.ts";

export const assertIsAuth = (auth: AuthPartial): auth is Auth => {
    if (auth.token && auth.user) return true;
    return false;
};
