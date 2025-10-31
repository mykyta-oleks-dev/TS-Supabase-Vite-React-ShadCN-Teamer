import { createClient } from '@supabase/supabase-js';
import { SUPABASE } from '../constants/env.constants.ts';
import type {Database} from '../types/supabase/database.types.ts'

const getSupabaseClient = (token: string) => {
    if (!SUPABASE.URL || !SUPABASE.ANON_KEY)
        throw new Error('Env vars not set');

    const supabaseClient = createClient<Database>(SUPABASE.URL, SUPABASE.ANON_KEY, {
        global: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

    return supabaseClient;
};

export default getSupabaseClient;
