import { TeamData } from './types/body.types.ts';
import { handleError } from '../../_shared/utils/handleError.ts';
import { AppError } from '../../_shared/types/middleware/error-handling.types.ts';
import { Team } from './types/team.ts';
import { TEAMS_ERRORS } from './constants/errors.constants.ts';
import { TypedSupabaseClient } from '../../_shared/types/supabase/client.types.ts';
import { TABLES } from '../../_shared/constants/tables.constants.ts';

class TeamsRepository {
    create = async (client: TypedSupabaseClient, data: TeamData) => {
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
}

const teamsRepository = new TeamsRepository();

export default teamsRepository;
