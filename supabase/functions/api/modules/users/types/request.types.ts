import { Database } from '../../../_shared/types/supabase/database.types.ts';
import { authData } from '../validation/schemas.ts';

export type AuthBody = Partial<authData>;

export type CreateProfileData = Database['public']['Tables']['users']['Insert'];

export type CreateProfileBody = Partial<CreateProfileData>;

export type UpdateProfileBody = Database['public']['Tables']['users']['Update'];
