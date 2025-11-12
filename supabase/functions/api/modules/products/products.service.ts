import z from '@zod/zod';
import getClient, { getAnonClient } from '../../_shared/config/supabase.ts';
import {
    Auth,
    AuthPartial,
} from '../../_shared/types/middleware/authentication.types.ts';
import { BadRequestError } from '../../_shared/types/middleware/error-handling.types.ts';
import { CreateTeamBody } from '../teams/types/request.types.ts';
import { PRODUCTS_ERRORS } from './constants/errors.constants.ts';
import productsRepository from './products.repository.ts';
import { ProductQuery, UpdateProductBody } from './types/request.types.ts';
import { isProductField, isStatus } from './utils/assertions.ts';
import {
    productCreateSchema,
    productEditSchema,
} from './validation/schemas.ts';
import { Status } from './types/product.types.ts';

class ProductsService {
    create = (auth: Auth, body: CreateTeamBody) => {
        const parsed = productCreateSchema.safeParse(body);

        if (!parsed.success) {
            throw new BadRequestError(
                PRODUCTS_ERRORS.VALIDATION,
                z.treeifyError(parsed.error).properties
            );
        }

        const client = getClient(auth.token);

        return productsRepository.create(client, auth.user.id, parsed.data);
    };

    getOne = (softAuth: AuthPartial, id: string) => {
        if (!id?.trim()) {
            throw new BadRequestError(PRODUCTS_ERRORS.NO_ID);
        }

        const parsedId = +id;

        if (Number.isNaN(parsedId)) {
            throw new BadRequestError(PRODUCTS_ERRORS.BAD_ID);
        }

        const client = softAuth.token
            ? getClient(softAuth.token)
            : getAnonClient();

        return productsRepository.getOne(client, parsedId);
    };

    getMany = (softAuth: AuthPartial, query: Record<string, string>) => {
        const queryParsed = this._parseQuery(query);

        const client = softAuth.token
            ? getClient(softAuth.token)
            : getAnonClient();

        return productsRepository.getMany(client, queryParsed);
    };

    update = (auth: Auth, id: string, body: UpdateProductBody) => {
        if (!id?.trim()) {
            throw new BadRequestError(PRODUCTS_ERRORS.NO_ID);
        }

        const parsedId = +id;

        if (Number.isNaN(parsedId)) {
            throw new BadRequestError(PRODUCTS_ERRORS.BAD_ID);
        }

        const parsed = productEditSchema.safeParse(body);

        if (!parsed.success) {
            throw new BadRequestError(
                PRODUCTS_ERRORS.VALIDATION,
                z.treeifyError(parsed.error).properties
            );
        }

        const client = getClient(auth.token);

        return productsRepository.update(
            client,
            auth.user.id,
            parsedId,
            parsed.data
        );
    };

    changeStatus = (auth: Auth, id: string, status?: string) => {
        if (!id?.trim()) {
            throw new BadRequestError(PRODUCTS_ERRORS.NO_ID);
        }

        const parsedId = +id;

        if (Number.isNaN(parsedId)) {
            throw new BadRequestError(PRODUCTS_ERRORS.BAD_ID);
        }

        if (!isStatus(status))
            throw new BadRequestError(PRODUCTS_ERRORS.BAD_STATUS);

        const client = getClient(auth.token);

        return productsRepository.changeStatus(
            client,
            auth.user.id,
            parsedId,
            status
        );
    };

    delete = (auth: Auth, id: string) => this.changeStatus(auth, id, 'deleted');

    private readonly _parseQuery = (
        raw: Record<string, string>
    ): ProductQuery => {
        const query: ProductQuery = {};

        if (raw.page) {
            const page = Number.parseInt(raw.page);
            if (!Number.isNaN(page) && page > 0) query.page = page;
        }

        if (raw.limit) {
            const limit = Number.parseInt(raw.limit);
            if (!Number.isNaN(limit) && limit > 0) query.limit = limit;
        }

        if (isProductField(raw.orderBy)) {
            query.orderBy = raw.orderBy;
        }

        if (raw.orderByType || raw.orderBy) {
            query.orderByType = raw.orderByType === 'desc' ? 'desc' : 'asc';
        }

        if (raw.text) query.text = raw.text;

        if (raw.user_id) query.userId = raw.user_id;
        else if (raw.userId) query.userId = raw.userId;

        if (isStatus(raw.status)) query.status = raw.status;

        if (raw.dateFrom) {
            const dateFrom = new Date(raw.dateFrom);

            if (!Number.isNaN(dateFrom.getTime())) query.dateFrom = dateFrom;
        }

        if (raw.dateTo) {
            const dateTo = new Date(raw.dateTo);

            if (!Number.isNaN(dateTo.getTime())) query.dateTo = dateTo;
        }

        if (
            raw.dateType &&
            (raw.dateType === 'created_at' || raw.dateType === 'updated_at')
        ) {
            query.dateType = raw.dateType;
        }

        return query;
    };
}

const productsService = new ProductsService();

export default productsService;
