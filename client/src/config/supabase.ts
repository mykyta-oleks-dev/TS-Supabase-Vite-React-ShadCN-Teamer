import { ENV } from '@/constants/env.constants';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const { URL, KEY } = ENV.SUPABASE;

let supabase: SupabaseClient | undefined;

const getSupabase = () => {
    if (supabase) return supabase;

    if (!URL || !KEY) throw new Error('Supabase env not defined');

    supabase = createClient(URL, KEY);
    return supabase;
};

export default getSupabase;
