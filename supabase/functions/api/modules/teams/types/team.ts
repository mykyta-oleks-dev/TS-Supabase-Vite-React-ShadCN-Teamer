import { Database } from "../../../_shared/types/supabase/database.types.ts";

export type Team = Database['public']['Tables']['teams']['Row'];
