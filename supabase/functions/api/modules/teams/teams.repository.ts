import { CreateTeamData, UpdateTeamData } from './types/body.types.ts';
import { handleError } from '../../_shared/utils/handleError.ts';
import {
    AppError,
    ForbiddenError,
    NotFoundError,
    UnauthorizedError,
} from '../../_shared/types/middleware/error-handling.types.ts';
import { Team } from './types/team.ts';
import { TEAMS_ERRORS } from './constants/errors.constants.ts';
import { TypedSupabaseClient } from '../../_shared/types/supabase/client.types.ts';
import { TABLES } from '../../_shared/constants/tables.constants.ts';
import { ERRORS } from '../../_shared/constants/errors.constants.ts';

class TeamsRepository {
    create = async (client: TypedSupabaseClient, data: CreateTeamData) => {
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

    update = async (
        client: TypedSupabaseClient,
        userId: string,
        data: UpdateTeamData
    ) => {
        const { data: userData, error: userError } = await client
            .from(TABLES.USERS)
            .select('team_id')
            .eq('id', userId)
            .single();

        if (userError) handleError(userError);

        if (!userData?.team_id)
            throw new ForbiddenError(TEAMS_ERRORS.FORBIDDEN);

        const { team_id } = userData;

        const { data: team, error: candidateError } = await client
            .from(TABLES.TEAMS)
            .select()
            .eq('id', team_id)
            .single();

        if (candidateError) handleError(candidateError);

        if (!team) throw new NotFoundError(TEAMS_ERRORS.NOT_FOUND);

        if (team.leader_id !== userId)
            throw new ForbiddenError(TEAMS_ERRORS.FORBIDDEN);

        const { data: teams, error } = await client
            .from(TABLES.TEAMS)
            .update(data)
            .eq('id', team_id)
            .select();

        if (error) handleError(error);

        if (!teams?.length) throw new ForbiddenError(TEAMS_ERRORS.NOT_UPDATED);
    };
}

const teamsRepository = new TeamsRepository();

export default teamsRepository;
