import { Database } from '../../../_shared/types/supabase/database.types.ts';
import { productCreateData, productEditData } from '../validation/schemas.ts';

export type CreateProductData = Omit<
	Database['public']['Tables']['products']['Insert'],
	'user_id' | 'team_id'
>;

export type UpdateProductData = Database['public']['Tables']['products']['Update'];

export type CreateProductBody = Partial<productCreateData>;

export type UpdateProductBody = Partial<productEditData>;
