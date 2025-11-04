import z from '@zod/zod';
import { Auth } from '../../_shared/types/middleware/authentication.types.ts';
import { BadRequestError } from '../../_shared/types/middleware/error-handling.types.ts';
import { TeamBody, TeamData } from './types/body.types.ts';
import { teamSchema } from './validation/schemas.ts';
import { TEAMS_ERRORS } from './constants/errors.constants.ts';
import { CODE_LENGTH } from './constants/validation.constants.ts';
import getClient from '../../_shared/config/supabase.ts';
import teamsRepository from './teams.repository.ts';

class TeamsService {
    create = async (auth: Auth, body: TeamBody) => {
        const parsed = teamSchema.safeParse(body);

        if (!parsed.success) {
            throw new BadRequestError(
                TEAMS_ERRORS.VALIDATION,
                z.treeifyError(parsed.error).properties
            );
        }

        const teamData: TeamData = {
            ...parsed.data,
            code: parsed.data.code ?? this._generateCode(),
        };

        const client = getClient(auth.token);

        return teamsRepository.create(client, teamData);
    };

    join = (auth: Auth, code?: string) => {
        if (!code?.trim() || code.length != 10)
            throw new BadRequestError(TEAMS_ERRORS.BAD_REQ_CODE);

        const client = getClient(auth.token);

        return teamsRepository.join(client, code);
    };

    private readonly _generateCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let code = '';
        for (let i = 0; i < CODE_LENGTH; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    };
}

const teamsService = new TeamsService();

export default teamsService;
