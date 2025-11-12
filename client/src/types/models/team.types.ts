import type { APIObject, ClientObject } from './common.types';

interface TeamPrimitives {
    code: string;
    id: string;
    is_deleted: boolean;
    leader_id: string;
    name: string;
}

export interface TeamAPI extends TeamPrimitives, APIObject {}

export interface Team extends TeamPrimitives, ClientObject {}

export const mapTeamFromAPI = (user: TeamAPI): Team => ({
    ...user,
    created_at: new Date(user.created_at),
    updated_at: new Date(user.updated_at),
});

export const mapTeamToAPI = (user: Team): TeamAPI => ({
    ...user,
    created_at: user.created_at.toISOString(),
    updated_at: user.updated_at.toISOString(),
});
