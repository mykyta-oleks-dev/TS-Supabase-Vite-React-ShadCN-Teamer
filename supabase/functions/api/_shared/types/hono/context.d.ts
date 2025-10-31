import { Auth } from '../middleware/authentication.types.ts';

declare module '@hono/hono' {
    interface ContextVariableMap {
        auth: Auth;
    }
}
