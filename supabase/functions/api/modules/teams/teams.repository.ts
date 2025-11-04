import { TABLES } from '../../_shared/constants/tables.constants.ts';
import {
    AppError,
    ForbiddenError,
    NotFoundError,
} from '../../_shared/types/middleware/error-handling.types.ts';
import { TypedSupabaseClient } from '../../_shared/types/supabase/client.types.ts';
import { handleError } from '../../_shared/utils/handleError.ts';
import { USERS_ERRORS } from '../users/constants/errors.constants.ts';
import { TEAMS_ERRORS } from './constants/errors.constants.ts';
import { CreateTeamData, UpdateTeamData } from './types/body.types.ts';
import { Team } from './types/team.ts';

class TeamsRepository {
    create = async (
        client: TypedSupabaseClient,
        userId: string,
        data: CreateTeamData
    ) => {
        await this._checkUser(client, userId);

        const response = await client.rpc('create_team_with_leader', {
            team_name: data.name,
            team_code: data.code,
        });

        const error = response.error;
        const team: Team | null = response.data;

        if (error) {
            handleError(error);
        }

        if (!team) {
            throw new AppError(TEAMS_ERRORS.NOT_CREATED);
        }

        return team;
    };

    join = async (client: TypedSupabaseClient, code: string) => {
        const { error } = await client.rpc('join_team', {
            p_code: code,
        });

        if (error) handleError(error);
    };

    getOne = async (
        client: TypedSupabaseClient,
        userId: string,
        deep: boolean
    ) => {
        const teamId = await this._checkUser(client, userId);

        if (!teamId) throw new NotFoundError(TEAMS_ERRORS.NOT_FOUND);

        const { data, error } = deep
            ? await this._getOnePopulated(client, teamId)
            : await this._getOne(client, teamId);

        if (error) handleError(error);

        if (!data || data === null)
            throw new NotFoundError(TEAMS_ERRORS.NOT_FOUND);

        const { users, ...team } = data;

        if ('count' in users[0]) return { team, users: users[0].count };
        return { team, users };
    };

    update = async (
        client: TypedSupabaseClient,
        userId: string,
        data: UpdateTeamData
    ) => {
        const team_id = await this._checkAuthorityAndGetTeamId(client, userId);

        const { data: teams, error } = await client
            .from(TABLES.TEAMS)
            .update(data)
            .eq('id', team_id)
            .select();

        if (error) handleError(error);

        if (!teams?.length) throw new ForbiddenError(TEAMS_ERRORS.NOT_UPDATED);
    };

    delete = async (client: TypedSupabaseClient, userId: string) => {
        const team_id = await this._checkAuthorityAndGetTeamId(client, userId);

        const { data: teams, error } = await client
            .from(TABLES.TEAMS)
            .update({
                is_deleted: true,
            })
            .eq('id', team_id)
            .select();

        if (error) handleError(error);

        if (!teams?.length) throw new ForbiddenError(TEAMS_ERRORS.NOT_UPDATED);
    };

    private readonly _getOnePopulated = async (
        client: TypedSupabaseClient,
        teamId: string
    ) => {
        return await client
            .from(TABLES.TEAMS)
            .select(
                `
                *,
                users:users!users_team_id_fkey (*)
            `
            )
            .eq('id', teamId)
            .single();
    };

    private readonly _getOne = async (
        client: TypedSupabaseClient,
        teamId: string
    ) => {
        return await client
            .from(TABLES.TEAMS)
            .select(
                `
                *,
                users:users!users_team_id_fkey (count)
            `
            )
            .eq('id', teamId)
            .single();
    };

    private readonly _checkUser = async (
        client: TypedSupabaseClient,
        userId: string
    ) => {
        const { data: userDatas, error: userError } = await client
            .from(TABLES.USERS)
            .select('team_id')
            .eq('id', userId);

        if (userError) handleError(userError);

        if (!userDatas?.length) throw new NotFoundError(USERS_ERRORS.NOT_FOUND);

        const userData = userDatas[0];

        return userData.team_id;
    };

    private readonly _checkAuthorityAndGetTeamId = async (
        client: TypedSupabaseClient,
        userId: string
    ) => {
        const team_id = await this._checkUser(client, userId);

        if (!team_id) throw new ForbiddenError(TEAMS_ERRORS.FORBIDDEN_UPDATE);

        const { data: candidates, error: candidateError } = await client
            .from(TABLES.TEAMS)
            .select()
            .eq('id', team_id);

        if (candidateError) handleError(candidateError);

        if (!candidates?.length)
            throw new NotFoundError(TEAMS_ERRORS.NOT_FOUND);

        const team = candidates[0];

        if (team.leader_id !== userId)
            throw new ForbiddenError(TEAMS_ERRORS.FORBIDDEN_UPDATE);

        return team_id;
    };
}

const teamsRepository = new TeamsRepository();

export default teamsRepository;
