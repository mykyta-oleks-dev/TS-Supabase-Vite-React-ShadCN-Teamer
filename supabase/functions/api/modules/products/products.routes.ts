import { Hono } from '@hono/hono';
import { PRODUCTS_ROUTES } from './constants/routes.constants.ts';
import { requireAuth } from '../../_shared/middleware/authentication.middleware.ts';
import productsController from './products.controller.ts';

const productsRouter = new Hono();

productsRouter.post(
    PRODUCTS_ROUTES.ROOT,
    requireAuth,
    productsController.create
);
productsRouter.get(PRODUCTS_ROUTES.DYNAMIC, productsController.getOne);

export default productsRouter;
