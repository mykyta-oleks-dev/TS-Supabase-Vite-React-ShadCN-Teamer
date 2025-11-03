import { Context } from '@hono/hono';
import { HTTP } from '../../_shared/constants/http.constants.ts';
import { TeamBody } from './types/body.types.ts';
import { getAuthOrThrow } from '../../_shared/utils/auth.ts';
import teamsService from "./teams.service.ts";

class TeamsController {
    create = async (c: Context) => {
        const auth = getAuthOrThrow(c);
        
		const body = (await c.req.json()) as TeamBody;

		const team = await teamsService.create(auth, body);

        return c.json(
            {
                message: 'Team created successfuly!',
                team,
            },
            HTTP.CREATED
        );
    };
}

const teamsController = new TeamsController();

export default teamsController;
