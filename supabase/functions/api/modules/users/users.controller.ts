import { Context } from '@hono/hono';
import { HTTP } from '../../_shared/constants/http.constants.ts';
import usersService from './users.service.ts';
import { CreateProfileBody, AuthBody } from './types/body.types.ts';
import { assertIsAuth } from '../../_shared/utils/auth.ts';
import { AppError } from '../../_shared/types/middleware/error-handling.types.ts';
import { ERRORS } from '../../_shared/constants/errors.constants.ts';

class UsersController {
    signUp = async (c: Context) => {
        const body = (await c.req.json()) as AuthBody;

        const data = await usersService.signUp(body);

        return c.json(
            {
                message: 'Successful sign-up!',
                token: data.session.access_token,
            },
            HTTP.CREATED
        );
    };

    logIn = async (c: Context) => {
        const body = await (c.req.json()) as AuthBody;

        const data = await usersService.logIn(body);

        return c.json(
            {
                message: 'Successful log-in!',
                token: data.session.access_token,
            },
            HTTP.OK
        );
    };

    createProfile = async (c: Context) => {
        const auth = c.get('auth');

        if (!assertIsAuth(auth)) {
            throw new AppError(ERRORS.UNEXPECTED);
        }

        const body = (await c.req.json()) as CreateProfileBody;

        const user = await usersService.createProfile(auth, body);

        return c.json(
            {
                message: 'Profile established!',
                user,
            },
            HTTP.CREATED
        );
    };
}

const usersController = new UsersController();

export default usersController;
