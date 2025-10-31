import { Context } from '@hono/hono';
import { HTTP } from '../../_shared/constants/http.constants.ts';
import usersService from './users.service.ts';
import { SignUpBody } from "./types/body.types.ts";

class UsersController {
    signUp = async (c: Context) => {
        const body = await c.req.json() as SignUpBody;

        const data = await usersService.signUp(body);

        return c.json(
            {
                message: 'Successful sign-up!',
                token: data.session.access_token,
            },
            HTTP.CREATED
        );
    };
}

const usersController = new UsersController();

export default usersController;
