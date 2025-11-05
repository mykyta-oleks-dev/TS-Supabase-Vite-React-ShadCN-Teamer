import { TABLES } from '../../_shared/constants/tables.constants.ts';
import {
    AppError,
    ForbiddenError,
    NotFoundError,
} from '../../_shared/types/middleware/error-handling.types.ts';
import { TypedSupabaseClient } from '../../_shared/types/supabase/client.types.ts';
import { handleError } from '../../_shared/utils/handleError.ts';
import { USERS_ERRORS } from '../users/constants/errors.constants.ts';
import { PRODUCTS_ERRORS } from './constants/errors.constants.ts';
import { productCreateData } from './validation/schemas.ts';

class ProductsRepository {
    create = async (
        client: TypedSupabaseClient,
        user_id: string,
        data: productCreateData
    ) => {
        const team_id = await this._checkUser(client, user_id);

        if (!team_id) throw new ForbiddenError(USERS_ERRORS.NOT_IN_TEAM);

        const { data: products, error } = await client
            .from(TABLES.PRODUCTS)
            .insert({
                ...data,
                team_id,
                user_id,
            })
            .select();

        if (error) handleError(error);

        if (!products?.length) throw new AppError(PRODUCTS_ERRORS.NOT_CREATED);

        return products[0];
    };

    private readonly _checkUser = async (
        client: TypedSupabaseClient,
        userId: string
    ) => {
        const { data: userDatas, error: userError } = await client
            .from(TABLES.USERS)
            .select('team_id')
            .eq('id', userId);

        if (userError) handleError(userError);

        if (!userDatas?.length) throw new NotFoundError(USERS_ERRORS.NOT_FOUND);

        const userData = userDatas[0];

        return userData.team_id;
    };
}

const productsRepository = new ProductsRepository();

export default productsRepository;
