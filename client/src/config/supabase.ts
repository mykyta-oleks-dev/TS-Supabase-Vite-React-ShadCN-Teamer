import { ENV } from '@/constants/env.constants';
import { createClient } from '@supabase/supabase-js';

const { URL, KEY } = ENV.SUPABASE;

if (!URL || !KEY) throw new Error('Supabase env not defined');

const supabase = createClient(URL, KEY);

export default supabase;
