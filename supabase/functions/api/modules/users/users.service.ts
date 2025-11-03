import z from '@zod/zod';
import getClient, { getSuperClient } from '../../_shared/config/supabase.ts';
import {
    AppError,
    BadRequestError,
} from '../../_shared/types/middleware/error-handling.types.ts';
import { CreateProfileBody, AuthBody } from './types/body.types.ts';
import { authSchema, profileSchema } from './validation/schemas.ts';
import {
    ERRORS,
} from '../../_shared/constants/errors.constants.ts';
import { Auth } from '../../_shared/types/middleware/authentication.types.ts';
import usersRepository from './users.repository.ts';
import { handleError } from '../../_shared/utils/handleError.ts';
import { USERS_ERRORS } from "./constants/errors.constants.ts";

class UsersService {
    signUp = async (body: AuthBody) => {
        const parsed = authSchema.safeParse(body);

        if (!parsed.success) {
            throw new BadRequestError(
                USERS_ERRORS.VALIDATION.AUTH,
                z.treeifyError(parsed.error).properties
            );
        }

        const client = getSuperClient();

        const { error, data } = await client.auth.signUp(parsed.data);

        if (error) handleError(error);

        const { user, session } = data;

        if (!user || !session) throw new AppError(ERRORS.UNEXPECTED);

        return { user, session };
    };

    logIn = async (body: AuthBody) => {
        const parsed = authSchema.safeParse(body);

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

    createProfile = async (auth: Auth, body: CreateProfileBody) => {
        const parsed = profileSchema.safeParse(body);

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
}

const usersService = new UsersService();

export default usersService;
