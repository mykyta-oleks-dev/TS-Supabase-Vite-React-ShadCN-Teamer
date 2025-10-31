import { User } from '@supabase/supabase-js';

export type Auth = {
    token?: string;
    user?: User;
};
