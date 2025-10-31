import { createClient } from '@supabase/supabase-js';
import { SUPABASE } from '../constants/env.constants.ts';
import type { Database } from '../types/supabase/database.types.ts';

const getClient = (token: string) => {
    if (!SUPABASE.URL || !SUPABASE.PUBLISHABLE_KEY)
        throw new Error('Env vars not set');

    const supabaseClient = createClient<Database>(
        SUPABASE.URL,
        SUPABASE.PUBLISHABLE_KEY,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        }
    );

    return supabaseClient;
};

export const getSuperClient = () => {
    if (!SUPABASE.URL || !SUPABASE.SECRET_KEY)
        throw new Error('Env vars not set');

    const supabaseClient = createClient<Database>(
        SUPABASE.URL,
        SUPABASE.SECRET_KEY
    );

    return supabaseClient;
};

export default getClient;
