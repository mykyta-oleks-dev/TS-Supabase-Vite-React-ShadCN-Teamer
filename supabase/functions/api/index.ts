// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

import { Hono } from '@hono/hono';
import { cors } from '@hono/hono/cors';

const app = new Hono().basePath(`/api`);

app.use('/*', cors());

app.get('/', (c) => {
    return c.json({ message: 'Hello World!' }, 200);
});

Deno.serve(app.fetch);
