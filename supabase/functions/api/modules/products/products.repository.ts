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
import { Status } from './types/product.types.ts';
import { ProductQuery } from './types/request.types.ts';
import { productCreateData, productEditData } from './validation/schemas.ts';

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

    getOne = async (client: TypedSupabaseClient, id: number) => {
        const { data: products, error } = await client
            .from(TABLES.PRODUCTS)
            .select()
            .eq('id', id);

        if (error) handleError(error);

        if (!products?.length) {
            throw new NotFoundError(PRODUCTS_ERRORS.NOT_FOUND);
        }

        return products[0];
    };

    getMany = async (client: TypedSupabaseClient, query: ProductQuery) => {
        let dbQuery = client.from(TABLES.PRODUCTS).select();

        const limit = Math.max(query.limit ?? 20, 1);
        const page = Math.max(query.page ?? 1, 1);
        dbQuery = dbQuery.range((page - 1) * limit, page * limit - 1);

        if (query.orderBy || query.orderByType)
            dbQuery = dbQuery.order(query.orderBy ?? 'id', {
                ascending: query.orderByType === 'asc',
            });

        if (query.status) dbQuery = dbQuery.eq('status', query.status);

        if (query.userId) dbQuery = dbQuery.eq('user_id', query.userId);

        if (query.text) {
            dbQuery = dbQuery.or(
                `title.ilike.%${query.text}%,description.ilike.%${query.text}%`
            );
        }

        if (query.dateFrom) {
            dbQuery = dbQuery.gte(
                query.date ?? 'created_at',
                query.dateFrom.toISOString()
            );
        }

        if (query.dateTo) {
            dbQuery = dbQuery.lte(
                query.date ?? 'created_at',
                query.dateTo.toISOString()
            );
        }

        const { data: products, error } = await dbQuery;

        if (error) handleError(error);

        const { count: queryCount } = await client
            .from(TABLES.PRODUCTS)
            .select('*', { count: 'exact' });

        const total = queryCount ?? products?.length ?? 0;

        const pages = Math.ceil(total / limit);

        const { count: countDeleted } = await client
            .from(TABLES.PRODUCTS)
            .select('*', { count: 'exact' })
            .eq('status', 'deleted');

        const { count: countDrafts } = await client
            .from(TABLES.PRODUCTS)
            .select('*', { count: 'exact' })
            .eq('status', 'draft');

        return {
            products: products ?? [],
            total,
            pages,
            limit,
            totalDeleted: countDeleted ?? 0,
            totalDrafts: countDrafts ?? 0,
        };
    };

    update = async (
        client: TypedSupabaseClient,
        userId: string,
        id: number,
        data: productEditData
    ) => {
        await this._checkAuthority(client, userId, id);

        const {data: oldProducts, error: oldProductsError } = await client
            .from(TABLES.PRODUCTS)
            .select()
            .eq('id', id);
        
        if (oldProductsError) handleError(oldProductsError);

        if (!oldProducts?.length) {
            throw new ForbiddenError(PRODUCTS_ERRORS.NOT_UPDATED);
        }

        const old = oldProducts[0];

        const { data: products, error } = await client
            .from(TABLES.PRODUCTS)
            .update(data)
            .eq('id', id)
            .select();

        if (error) handleError(error);

        if (!products?.length)
            throw new ForbiddenError(PRODUCTS_ERRORS.NOT_UPDATED);

        const oldImage = old.image.split(`${TABLES.PRODUCTS}/`)[1];

        if (oldImage) client.storage.from(TABLES.PRODUCTS).remove([oldImage]);
    };

    changeStatus = async (
        client: TypedSupabaseClient,
        userId: string,
        id: number,
        status: Status
    ) => {
        await this._checkAuthority(client, userId, id);

        const { data: products, error } = await client
            .from(TABLES.PRODUCTS)
            .update({
                status,
            })
            .eq('id', id)
            .select();

        if (error) handleError(error);

        if (!products?.length)
            throw new ForbiddenError(PRODUCTS_ERRORS.NOT_UPDATED);
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

    private readonly _checkAuthority = async (
        client: TypedSupabaseClient,
        userId: string,
        id: number
    ) => {
        const team_id = await this._checkUser(client, userId);

        if (!team_id)
            throw new ForbiddenError(PRODUCTS_ERRORS.FORBIDDEN_UPDATE);

        const { data: candidates, error: candidateError } = await client
            .from(TABLES.PRODUCTS)
            .select()
            .eq('id', id);

        if (candidateError) handleError(candidateError);

        if (!candidates?.length)
            throw new NotFoundError(PRODUCTS_ERRORS.NOT_FOUND);

        const product = candidates[0];

        if (product.team_id !== team_id)
            throw new ForbiddenError(PRODUCTS_ERRORS.FORBIDDEN_UPDATE);
    };
}

const productsRepository = new ProductsRepository();

export default productsRepository;
