import z from '@zod/zod';
import getClient, { getSuperClient } from '../../_shared/config/supabase.ts';
import {
    AppError,
    BadRequestError,
} from '../../_shared/types/middleware/error-handling.types.ts';
import {
    ChangePasswordBody,
    CreateProfileBody,
    LogInBody,
    SignUpBody,
    UpdateProfileBody,
} from './types/request.types.ts';
import {
    logInSchema,
    createProfileSchema,
    updateProfileSchema,
    signUpSchema,
    confirmPasswordSchema,
} from './validation/schemas.ts';
import { ERRORS } from '../../_shared/constants/errors.constants.ts';
import { Auth } from '../../_shared/types/middleware/authentication.types.ts';
import usersRepository from './users.repository.ts';
import { handleError } from '../../_shared/utils/handleError.ts';
import { USERS_ERRORS } from './constants/errors.constants.ts';

class UsersService {
    signUp = async (body: SignUpBody, redirectUrl?: string) => {
        const parsed = signUpSchema.safeParse(body);

        if (!parsed.success) {
            throw new BadRequestError(
                USERS_ERRORS.VALIDATION.AUTH,
                z.treeifyError(parsed.error).properties
            );
        }

        const client = getSuperClient();

        const { error, data } = await client.auth.signUp({
            ...parsed.data,
            options: {
                emailRedirectTo: redirectUrl,
            },
        });

        if (error) handleError(error);

        const { user, session } = data;

        if (!user) throw new AppError(ERRORS.UNEXPECTED);

        return { user };
    };

    logIn = async (body: LogInBody) => {
        const parsed = logInSchema.safeParse(body);

        if (!parsed.success) {
            throw new BadRequestError(
                USERS_ERRORS.VALIDATION.AUTH,
                z.treeifyError(parsed.error).properties
            );
        }

        const client = getSuperClient();

        const { data, error } = await client.auth.signInWithPassword({
            email: parsed.data.email,
            password: parsed.data.password,
        });

        if (error) handleError(error);

        const { user, session } = data;

        if (!user || !session) throw new AppError(ERRORS.UNEXPECTED);

        return { user, session };
    };

    changePassword = async (auth: Auth, body: ChangePasswordBody) => {
        const parsed = confirmPasswordSchema.safeParse(body);

        if (!parsed.success) {
            throw new BadRequestError(
                USERS_ERRORS.VALIDATION.AUTH,
                z.treeifyError(parsed.error).properties
            );
        }

        const client = getSuperClient();

        const { error } = await client.auth.admin.updateUserById(auth.user.id, {
            password: parsed.data.password,
        });

        if (error) handleError(error);
    };

    resendVerification = async (auth: Auth, emailRedirectTo?: string) => {
        const client = getSuperClient();

        if (!auth.user.email) throw new AppError(ERRORS.UNEXPECTED);

        if (auth.user.email_confirmed_at) {
            throw new BadRequestError(ERRORS.AUTH.VERIFIED);
        }

        const { error } = await client.auth.resend({
            type: 'signup',
            email: auth.user.email,
            options: {
                emailRedirectTo,
            },
        });

        if (error) handleError(error);
    };

    resetPassword = async (auth: Auth, redirectTo?: string) => {
        const client = getSuperClient();

        if (!auth.user.email) throw new AppError(ERRORS.UNEXPECTED);

        const { error } = await client.auth.resetPasswordForEmail(
            auth.user.email,
            {
                redirectTo,
            }
        );

        if (error) handleError(error);
    };

    createProfile = async (auth: Auth, body: CreateProfileBody) => {
        const parsed = createProfileSchema.safeParse(body);

        if (!parsed.success) {
            throw new BadRequestError(
                USERS_ERRORS.VALIDATION.AUTH,
                z.treeifyError(parsed.error).properties
            );
        }

        const client = getClient(auth.token);

        const user = await usersRepository.createProfile(
            client,
            auth.user.id,
            parsed.data
        );

        return user;
    };

    getAll = (auth: Auth, withDeleted?: boolean) => {
        const client = getClient(auth.token);

        return usersRepository.getAll(client, withDeleted);
    };

    getOne = (auth: Auth, id?: string) => {
        if (!id?.trim()) {
            throw new BadRequestError(USERS_ERRORS.NO_ID);
        }

        const client = getClient(auth.token);

        return usersRepository.getOne(client, id);
    };

    update = async (auth: Auth, body: UpdateProfileBody) => {
        const parsed = updateProfileSchema.safeParse(body);

        if (!parsed.success) {
            throw new BadRequestError(
                USERS_ERRORS.VALIDATION.AUTH,
                z.treeifyError(parsed.error).properties
            );
        }

        const client = getClient(auth.token);

        await usersRepository.update(client, auth.user.id, parsed.data);
    };

    delete = async (auth: Auth) => {
        const superClient = getSuperClient();

        await usersRepository.delete(superClient, auth.user.id);

        await superClient.auth.admin.deleteUser(auth.user.id, true);
    };
}

const usersService = new UsersService();

export default usersService;
