import { Context } from '@hono/hono';
import { HTTP } from '../../_shared/constants/http.constants.ts';
import { CreateTeamBody, UpdateTeamBody } from './types/body.types.ts';
import { getAuthOrThrow } from '../../_shared/utils/auth.ts';
import teamsService from './teams.service.ts';

class TeamsController {
    create = async (c: Context) => {
        const auth = getAuthOrThrow(c);

        const body = (await c.req.json()) as CreateTeamBody;

        const team = await teamsService.create(auth, body);

        return c.json(
            {
                message: 'Team created successfuly!',
                team,
            },
            HTTP.CREATED
        );
    };

    join = async (c: Context) => {
        const auth = getAuthOrThrow(c);

        const { code } = (await c.req.json()) as { code?: string };

        await teamsService.join(auth, code);

        return c.json({ message: 'Successfuly joined the team!' }, HTTP.OK);
    };

    getOne = async (c: Context) => {
        const auth = getAuthOrThrow(c);

        const deep = c.req.query('deep') === 'true';

        const { team, users } = await teamsService.getOne(auth, deep);

        return c.json(
            { message: 'Team fetched successfuly!', team, users },
            HTTP.OK
        );
    };

    update = async (c: Context) => {
        const auth = getAuthOrThrow(c);

        const body = (await c.req.json()) as UpdateTeamBody;

        await teamsService.update(auth, body);

        return c.body(null, HTTP.NO_CONTENT);
    };

    delete = async (c: Context) => {
        const auth = getAuthOrThrow(c);

        await teamsService.delete(auth);

        return c.body(null, HTTP.NO_CONTENT);
    };
}

const teamsController = new TeamsController();

export default teamsController;
