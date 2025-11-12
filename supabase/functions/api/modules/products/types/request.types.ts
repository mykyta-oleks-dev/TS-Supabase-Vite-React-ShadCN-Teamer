import { Database } from '../../../_shared/types/supabase/database.types.ts';
import { GetManyQuery } from '../../../_shared/types/query.types.ts';
import { productCreateData, productEditData } from '../validation/schemas.ts';
import { Product, Status } from './product.types.ts';

export type CreateProductData = Omit<
    Database['public']['Tables']['products']['Insert'],
    'user_id' | 'team_id'
>;

export type UpdateProductData =
    Database['public']['Tables']['products']['Update'];

export type CreateProductBody = Partial<productCreateData>;

export type UpdateProductBody = Partial<productEditData>;

type Filters = {
    text?: string;
    userId?: string;
    status?: Status;
    dateFrom?: Date;
    dateTo?: Date;
    dateType?: 'created_at' | 'updated_at'
};

export type ProductQuery = GetManyQuery<Product> & Filters;
