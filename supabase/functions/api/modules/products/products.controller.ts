import { Context } from '@hono/hono';
import { HTTP } from '../../_shared/constants/http.constants.ts';
import { getAuthOrThrow } from '../../_shared/utils/auth.ts';
import { CreateTeamBody } from '../teams/types/request.types.ts';
import productsService from './products.service.ts';
import { UpdateProductBody } from './types/request.types.ts';

class ProductsController {
    create = async (c: Context) => {
        const auth = getAuthOrThrow(c);

        const body = (await c.req.json()) as CreateTeamBody;

        const product = await productsService.create(auth, body);

        return c.json(
            {
                message: 'Product successfuly created!',
                product,
            },
            HTTP.CREATED
        );
    };

    getOne = async (c: Context) => {
        const softAuth = c.get('auth');

        const id = c.req.param('id');

        const product = await productsService.getOne(softAuth, id);

        return c.json(
            {
                message: 'Successfuly fetched a product!',
                product,
            },
            HTTP.OK
        );
    };

    getMany = async (c: Context) => {
        const softAuth = c.get('auth');

        const query = c.req.query();

        const data = await productsService.getMany(softAuth, query);

        const { products, count, limit, pages } = data;

        return c.json(
            {
                message: 'Successfuly fetched products!',
                products,
                count,
                limit,
                pages,
            },
            HTTP.OK
        );
    };

    update = async (c: Context) => {
        const auth = getAuthOrThrow(c);

        const id = c.req.param('id');

        const body = (await c.req.json()) as UpdateProductBody;

        await productsService.update(auth, id, body);

        return c.body(null, HTTP.NO_CONTENT);
    };
}

const productsController = new ProductsController();

export default productsController;
