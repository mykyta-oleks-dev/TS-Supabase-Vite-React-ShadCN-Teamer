// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

import { Hono } from '@hono/hono';
import { cors } from '@hono/hono/cors';
import { HTTP } from './_shared/constants/http.constants.ts';
import { softAuth } from './_shared/middleware/authentication.middleware.ts';
import {
    errorHandler,
    notFoundPage,
} from './_shared/middleware/error-handling.middleware.ts';
import { AppError } from './_shared/types/middleware/error-handling.types.ts';
import { usersRouter, teamsRouter } from './modules/index.ts';

const app = new Hono().basePath(`/api`);

app.use('/*', cors());
app.use('*', softAuth);

app.get('/', (c) => {
    return c.json({ message: 'Hello World!' }, HTTP.OK);
});

app.all('error', (c) => {
    throw new AppError('Testing the error', HTTP.INTERNAL, {
        method: c.req.method,
    });
});

app.route('users', usersRouter);
app.route('teams', teamsRouter);

app.notFound(notFoundPage);

app.onError(errorHandler);

Deno.serve(app.fetch);
