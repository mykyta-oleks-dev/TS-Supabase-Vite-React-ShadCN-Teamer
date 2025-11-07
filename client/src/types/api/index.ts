import type { UserAPI } from '../models/user.types';

export interface DefaultBody {
    message: string;
}

export interface ApiError extends DefaultBody {
    status: 'error' | 'fail';
    stack?: string;
    errors?: unknown;
    payload?: unknown;
}

export interface AuthToken extends DefaultBody {
    access_token: string;
	refresh_token: string;
}

export interface OneUser extends DefaultBody {
    user: UserAPI;
}
