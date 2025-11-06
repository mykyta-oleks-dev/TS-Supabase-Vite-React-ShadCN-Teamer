export const ENV = {
    SUPABASE: {
        URL: import.meta.env.VITE_SUPABASE_URL,
        KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },

    API: {
        URL: import.meta.env.VITE_API_URL,
    },

    IS_DEV: import.meta.env.DEV,
} as const;
