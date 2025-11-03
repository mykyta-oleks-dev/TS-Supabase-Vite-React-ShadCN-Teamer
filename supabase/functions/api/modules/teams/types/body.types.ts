import { Database } from '../../../_shared/types/supabase/database.types.ts';
import { teamData } from "../validation/schemas.ts";

export type TeamData = Database['public']['Tables']['teams']['Insert'];

export type TeamBody = Partial<teamData>;
