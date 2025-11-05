import { Database } from "../../../_shared/types/supabase/database.types.ts";

export type Product = Database['public']['Tables']['products']['Row'];
