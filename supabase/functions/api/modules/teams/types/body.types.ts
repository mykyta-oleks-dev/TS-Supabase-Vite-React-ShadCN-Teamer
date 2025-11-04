import { Database } from '../../../_shared/types/supabase/database.types.ts';
import { teamCreateData, teamEditData } from '../validation/schemas.ts';

export type CreateTeamData = Omit<
    Database['public']['Tables']['teams']['Insert'],
    'leader_id'
>;

export type UpdateTeamData = Database['public']['Tables']['teams']['Update'];

export type CreateTeamBody = Partial<teamCreateData>;

export type UpdateTeamBody = Partial<teamEditData>;
