import z from '@zod/zod';
import getClient, { getAnonClient } from '../../_shared/config/supabase.ts';
import {
    Auth,
    AuthPartial,
} from '../../_shared/types/middleware/authentication.types.ts';
import { BadRequestError } from '../../_shared/types/middleware/error-handling.types.ts';
import { CreateTeamBody } from '../teams/types/request.types.ts';
import productsRepository from './products.repository.ts';
import {
    productCreateSchema,
    productEditSchema,
} from './validation/schemas.ts';
import { PRODUCTS_ERRORS } from './constants/errors.constants.ts';
import { UpdateProductBody } from './types/request.types.ts';

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

        return productsRepository.update(client, auth.user.id, parsedId, parsed.data);
    };
}

const productsService = new ProductsService();

export default productsService;
