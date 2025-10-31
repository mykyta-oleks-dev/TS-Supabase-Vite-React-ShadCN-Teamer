// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

import { Hono } from '@hono/hono';
import { cors } from '@hono/hono/cors';
import {
    errorHandler,
    notFoundPage,
} from './_shared/middleware/error-handling.middleware.ts';
import { AppError } from './_shared/types/middleware/error-handling.types.ts';
import { softAuth } from "./_shared/middleware/authentication.middleware.ts";

const app = new Hono().basePath(`/api`);

app.use('/*', cors());
app.use('*', softAuth);

app.get('/', (c) => {
    return c.json({ message: 'Hello World!' }, 200);
});

app.all('/error', (c) => {
    throw new AppError('Testing the error', 500, {
        method: c.req.method,
    });
});

app.notFound(notFoundPage);

app.onError(errorHandler);

Deno.serve(app.fetch);
