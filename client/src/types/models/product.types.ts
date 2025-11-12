import type { APIObject, ClientObject } from './common.types';

export type Status = 'draft' | 'active' | 'deleted';

interface ProductPrimitives {
    id: number;
    description: string;
    image: string;
    status: Status;
    team_id: string;
    title: string;
    user_id: string;
}

export interface ProductAPI extends ProductPrimitives, APIObject {}

export interface Product extends ProductPrimitives, ClientObject {}

export const mapProductFromAPI = (product: ProductAPI): Product => ({
	...product,
	created_at: new Date(product.created_at),
	updated_at: new Date(product.updated_at),
});

export const mapProductToAPI = (product: Product): ProductAPI => ({
	...product,
	created_at: product.created_at.toISOString(),
	updated_at: product.updated_at.toISOString(),
});
