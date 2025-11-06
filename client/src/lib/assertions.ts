import type { ApiError } from '@/types/api.types';
import type { ZodErrorProperties } from '@/types/zod.types';

export const isZodErrors = (
    payload: unknown
): payload is ZodErrorProperties => {
    if (typeof payload === 'object' && payload !== null) {
        const payloadArr = Object.entries(payload);

        return payloadArr.every(
            ([, value]) =>
                typeof value === 'object' &&
                value !== null &&
                'errors' in value &&
                Array.isArray(value.errors) &&
                value.errors.every((i: unknown) => typeof i === 'string')
        );
    }
    return false;
};

export const isApiError = (error: unknown): error is ApiError =>
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error;
