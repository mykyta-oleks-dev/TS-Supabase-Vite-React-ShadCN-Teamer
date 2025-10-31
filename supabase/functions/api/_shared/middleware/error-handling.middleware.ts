import type { Context } from '@hono/hono';
import { HTTP } from '../constants/http.constants.ts';
import {
    AppError,
    ErrorResponse,
    NotFoundError,
} from '../types/middleware/error-handling.types.ts';
import { ContentfulStatusCode } from '@hono/hono/utils/http-status';

export const errorHandler = (err: unknown, c: Context) => {
    let status: ContentfulStatusCode = HTTP.INTERNAL;
    let message = 'Internal Server Error';
    let payload: unknown;
    let isOperational = false;

    if (err instanceof AppError) {
        status = err.status;
        message = err.message;
        payload = err.payload;
        isOperational = err.isOperational;
    }

    if (!isOperational || status === 500) {
        console.error('Error:', {
            name: (err as Error).name,
            message: (err as Error).message,
            status,
            stack: (err as Error).stack,
            payload,
        });
    }

    const response: ErrorResponse = {
        status: status >= 500 ? 'error' : 'fail',
        message,
        payload,
    };

    if (Deno.env.get('NODE_ENV') !== 'production') {
        response.stack = (err as Error).stack;
    }

    return c.json(response, status);
};

export const notFoundPage = (c: Context) => {
    throw new NotFoundError(
        `Route ${c.req.method} ${c.req.path} is not found.`
    );
};
