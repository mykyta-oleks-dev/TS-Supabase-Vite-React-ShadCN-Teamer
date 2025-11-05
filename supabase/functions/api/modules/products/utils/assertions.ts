import { ProductField, Status } from '../types/product.types.ts';

export const productFields: ProductField[] = [
    'created_at',
    'description',
    'id',
    'image',
    'status',
    'team_id',
    'user_id',
    'title',
    'updated_at',
];

export const isProductField = (orderBy?: string): orderBy is ProductField =>
    !!orderBy && productFields.includes(orderBy as ProductField);

export const isStatus = (status?: string): status is Status =>
    !!status &&
    ((status as Status) === 'active' ||
        (status as Status) === 'draft' ||
        (status as Status) === 'deleted');
