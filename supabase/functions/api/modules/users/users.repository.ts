import { TABLES } from '../../_shared/constants/tables.constants.ts';
import { AppError } from '../../_shared/types/middleware/error-handling.types.ts';
import { TypedSupabaseClient } from "../../_shared/types/supabase/client.types.ts";
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

        if (error) handleError(error)

        if (!user) {
            throw new AppError(USERS_ERRORS.PROFILE_NOT_CREATED);
        }

        return user;
    };
}

const usersRepository = new UsersRepository();

export default usersRepository;
