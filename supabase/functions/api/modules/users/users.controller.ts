import { Context } from '@hono/hono';
import { HTTP } from '../../_shared/constants/http.constants.ts';
import usersService from './users.service.ts';
import {
    CreateProfileBody,
    UpdateProfileBody,
    AuthBody,
} from './types/request.types.ts';
import { getAuthOrThrow } from '../../_shared/utils/auth.ts';

class UsersController {
    signUp = async (c: Context) => {
        const body = (await c.req.json()) as AuthBody;

        const redirectUrl = c.req.query('redirectUrl');

        await usersService.signUp(body, redirectUrl);

        return c.json(
            {
                message:
                    'Successful sign-up! Verify your account with the link sent to your email to continue.',
            },
            HTTP.CREATED
        );
    };

    logIn = async (c: Context) => {
        const body = (await c.req.json()) as AuthBody;

        const data = await usersService.logIn(body);

        return c.json(
            {
                message: 'Successful log-in!',
                token: data.session.access_token,
            },
            HTTP.OK
        );
    };

    resendVerification = async (c: Context) => {
        const auth = getAuthOrThrow(c);

        await usersService.resendVerification(auth);

        return c.body(null, HTTP.NO_CONTENT);
    };

    createProfile = async (c: Context) => {
        const auth = getAuthOrThrow(c);

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

    // Gets only own profile or of team members
    getAll = async (c: Context) => {
        const auth = getAuthOrThrow(c);

        const withDeleted = c.req.query('withDeleted') === 'true';

        const users = await usersService.getAll(auth, withDeleted);

        return c.json(
            {
                message: 'Profiles fetched succesfuly!',
                users,
            },
            HTTP.OK
        );
    };

    getOne = async (c: Context) => {
        const auth = getAuthOrThrow(c);

        const id = c.req.param('id');

        const user = await usersService.getOne(auth, id);

        return c.json(
            {
                message: 'Profile fetched succesfuly!',
                user,
            },
            HTTP.OK
        );
    };

    update = async (c: Context) => {
        const auth = getAuthOrThrow(c);

        const body = (await c.req.json()) as UpdateProfileBody;

        await usersService.update(auth, body);

        return c.body(null, HTTP.NO_CONTENT);
    };

    delete = async (c: Context) => {
        const auth = getAuthOrThrow(c);

        await usersService.delete(auth);

        return c.body(null, HTTP.NO_CONTENT);
    };
}

const usersController = new UsersController();

export default usersController;
