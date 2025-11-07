import type { UserAPI } from "../models/user.types";

export interface DefaultBody {
	message: string;
}

export interface ApiError extends DefaultBody {
	status: 'error' | 'fail';
	stack?: string;
	errors?: unknown;
	payload?: unknown;
}

export interface OneUser extends DefaultBody {
	user: UserAPI;
}
