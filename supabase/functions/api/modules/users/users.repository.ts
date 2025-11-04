import { TABLES } from '../../_shared/constants/tables.constants.ts';
import {
    AppError,
    NotFoundError,
} from '../../_shared/types/middleware/error-handling.types.ts';
import { TypedSupabaseClient } from '../../_shared/types/supabase/client.types.ts';
import { handleError } from '../../_shared/utils/handleError.ts';
import { USERS_ERRORS } from './constants/errors.constants.ts';
import { profileData } from './validation/schemas.ts';

class UsersRepository {
    createProfile = async (
        client: TypedSupabaseClient,
        id: string,
        data: profileData
    ) => {
        const { data: user, error } = await client
            .from(TABLES.USERS)
            .insert({
                ...data,
                id,
            })
            .select()
            .single();

        if (error) handleError(error);

        if (!user) {
            throw new AppError(USERS_ERRORS.PROFILE_NOT_CREATED);
        }

        return user;
    };

    getAll = async (client: TypedSupabaseClient) => {
        const { data: users, error } = await client.from(TABLES.USERS).select();

        if (error) handleError(error);

        return users ?? [];
    };

    getOne = async (client: TypedSupabaseClient, id: string) => {
        const { data: users, error } = await client
            .from(TABLES.USERS)
            .select()
            .eq('id', id);

        if (error) handleError(error);

        if (!users?.length) throw new NotFoundError(USERS_ERRORS.NOT_FOUND);

        return users[0];
    };
}

const usersRepository = new UsersRepository();

export default usersRepository;
