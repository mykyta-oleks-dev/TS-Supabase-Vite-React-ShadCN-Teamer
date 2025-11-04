import z from '@zod/zod';
import { Auth } from '../../_shared/types/middleware/authentication.types.ts';
import { BadRequestError } from '../../_shared/types/middleware/error-handling.types.ts';
import {
    CreateTeamBody,
    CreateTeamData,
    UpdateTeamData,
    UpdateTeamBody,
} from './types/body.types.ts';
import { teamCreateSchema, teamEditSchema } from './validation/schemas.ts';
import { TEAMS_ERRORS } from './constants/errors.constants.ts';
import { CODE_LENGTH } from './constants/validation.constants.ts';
import getClient from '../../_shared/config/supabase.ts';
import teamsRepository from './teams.repository.ts';

class TeamsService {
    create = (auth: Auth, body: CreateTeamBody) => {
        const parsed = teamCreateSchema.safeParse(body);

        if (!parsed.success) {
            throw new BadRequestError(
                TEAMS_ERRORS.VALIDATION,
                z.treeifyError(parsed.error).properties
            );
        }

        const teamData: CreateTeamData = {
            ...parsed.data,
            code: parsed.data.code ?? this._generateCode(),
        };

        const client = getClient(auth.token);

        return teamsRepository.create(client, auth.user.id, teamData);
    };

    join = (auth: Auth, code?: string) => {
        if (!code?.trim() || code.length != 10)
            throw new BadRequestError(TEAMS_ERRORS.BAD_REQ_CODE);

        const client = getClient(auth.token);

        return teamsRepository.join(client, code);
    };

    update = (auth: Auth, body: UpdateTeamBody) => {
        const parsed = teamEditSchema.safeParse(body);

        if (!parsed.success) {
            throw new BadRequestError(
                TEAMS_ERRORS.VALIDATION,
                z.treeifyError(parsed.error).properties
            );
        }

        const teamData: UpdateTeamData = {
            ...parsed.data,
        };

        const client = getClient(auth.token);

        return teamsRepository.update(client, auth.user.id, teamData);
    };

    delete = (auth: Auth) => {
        const client = getClient(auth.token);

        return teamsRepository.delete(client, auth.user.id);
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
