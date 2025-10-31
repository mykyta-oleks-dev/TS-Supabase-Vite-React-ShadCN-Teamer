export const SUPABASE = {
    URL: Deno.env.get('SUPABASE_URL'),
    SERVICE_ROLE_KEY: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    ANON_KEY: Deno.env.get('SUPABASE_ANON_KEY'),
    PUBLISHABLE_KEY: Deno.env.get('PUBLISHABLE_KEY'),
    SECRET_KEY: Deno.env.get('SECRET_KEY'),
    DB_URL: Deno.env.get('SUPABASE_DB_URL'),
} as const;
