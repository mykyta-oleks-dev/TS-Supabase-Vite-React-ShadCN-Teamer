import { Context } from '@hono/hono';
import { HTTP } from '../../_shared/constants/http.constants.ts';
import { getAuthOrThrow } from "../../_shared/utils/auth.ts";
import { CreateTeamBody } from "../teams/types/body.types.ts";
import productsService from "./products.service.ts";

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
}

const productsController = new ProductsController();

export default productsController;
