import type { APIObject, ClientObject } from './common.types';

const statuses = ['draft', 'active', 'deleted'] as const;

export type Status = (typeof statuses)[number];

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

export const isStatus = (status?: string | null): status is Status =>
    !!status && statuses.includes(status as Status);
