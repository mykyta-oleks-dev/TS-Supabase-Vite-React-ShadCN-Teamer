import { Database } from '../../../_shared/types/supabase/database.types.ts';
import { confirmPasswordData, logInData, signUpData } from '../validation/schemas.ts';

export type LogInBody = Partial<logInData>;

export type SignUpBody = Partial<signUpData>;

export type ChangePasswordBody = Partial<confirmPasswordData>;

export type CreateProfileData = Database['public']['Tables']['users']['Insert'];

export type CreateProfileBody = Partial<CreateProfileData>;

export type UpdateProfileBody = Database['public']['Tables']['users']['Update'];
