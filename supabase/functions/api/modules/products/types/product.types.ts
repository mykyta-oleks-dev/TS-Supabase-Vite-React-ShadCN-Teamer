import { Database } from '../../../_shared/types/supabase/database.types.ts';

export type Product = Database['public']['Tables']['products']['Row'];

export type ProductField = keyof Product;

export type Status = Database['public']['Enums']['Status'];
