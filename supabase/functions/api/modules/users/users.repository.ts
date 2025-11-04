import { TABLES } from '../../_shared/constants/tables.constants.ts';
import {
  AppError,
  NotFoundError,
} from '../../_shared/types/middleware/error-handling.types.ts';
import { TypedSupabaseClient } from '../../_shared/types/supabase/client.types.ts';
import { handleError } from '../../_shared/utils/handleError.ts';
import { USERS_ERRORS } from './constants/errors.constants.ts';
import { createProfileData, updateProfileData } from './validation/schemas.ts';

class UsersRepository {
    createProfile = async (
        client: TypedSupabaseClient,
        id: string,
        data: createProfileData
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

    getAll = async (client: TypedSupabaseClient, withDeleted?: boolean) => {
        let query = client.from(TABLES.USERS).select();

        if (!withDeleted) query = query.eq('is_deleted', false);
        
        const { data: users, error } = await query;

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

    update = async (
        client: TypedSupabaseClient,
        id: string,
        data: updateProfileData
    ) => {
        const { error } = await client
            .from(TABLES.USERS)
            .update(data)
            .eq('id', id);

        if (error) handleError(error);
    };

    delete = async (client: TypedSupabaseClient, id: string) => {
        const { error } = await client
            .from(TABLES.USERS)
            .update({
                is_deleted: true
            })
            .eq('id', id)
        
        if (error) handleError(error);
    }
}

const usersRepository = new UsersRepository();

export default usersRepository;
