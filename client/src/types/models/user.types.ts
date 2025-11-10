import type { APIObject, ClientObject } from './common.types';

interface UserPrimitives {
    id: string;
    full_name: string;
    avatar: string;
    about?: string | null;
    is_deleted: boolean;
    team_id?: string | null;
}

export interface UserAPI extends UserPrimitives, APIObject {}

export interface User extends UserPrimitives, ClientObject {}

export const mapUserFromAPI = (user: UserAPI): User => ({
    ...user,
    created_at: new Date(user.created_at),
    updated_at: new Date(user.updated_at),
});

export const mapUserToAPI = (user: User): UserAPI => ({
    ...user,
    created_at: user.created_at.toISOString(),
    updated_at: user.updated_at.toISOString(),
});
