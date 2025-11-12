import type { TeamAPI } from '../models/team.types';
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

export interface OneTeam extends DefaultBody {
    team: TeamAPI;
    users: unknown;
    products: number;
}

export interface OneTeamCount extends OneTeam {
    users: number;
}

export interface OneTeamArray extends OneTeam {
    users: UserAPI[];
}

export const isWithCount = (res: OneTeam): res is OneTeamCount =>
    typeof res.users === 'number';

export const isWithArray = (res: OneTeam): res is OneTeamArray =>
    Array.isArray(res.users);
