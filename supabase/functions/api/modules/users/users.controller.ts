import { Context } from '@hono/hono';
import { HTTP } from '../../_shared/constants/http.constants.ts';
import usersService from './users.service.ts';
import {
    CreateProfileBody,
    UpdateProfileBody,
    LogInBody,
    SignUpBody,
    ChangePasswordBody,
} from './types/request.types.ts';
import { getAuthOrThrow } from '../../_shared/utils/auth.ts';

class UsersController {
    signUp = async (c: Context) => {
        const body = (await c.req.json()) as SignUpBody;

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
        const body = (await c.req.json()) as LogInBody;

        const data = await usersService.logIn(body);

        return c.json(
            {
                message: 'Successful log-in!',
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
            },
            HTTP.OK
        );
    };

    changePassword = async (c: Context) => {
        const auth = getAuthOrThrow(c);

        const body = (await c.req.json()) as ChangePasswordBody;

        await usersService.changePassword(auth, body);

        return c.body(null, HTTP.NO_CONTENT);
    };

    resendVerification = async (c: Context) => {
        const auth = getAuthOrThrow(c);

        const redirectTo = c.req.query('redirectTo');

        await usersService.resendVerification(auth, redirectTo);

        return c.body(null, HTTP.NO_CONTENT);
    };

    resetPassword = async (c: Context) => {
        const { email } = (await c.req.json()) as { email?: string };

        const redirectTo = c.req.query('redirectTo');

        await usersService.resetPassword(email, redirectTo);

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
