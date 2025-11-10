import { AuthError, isAuthError } from '@supabase/supabase-js';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { isAxiosError } from 'axios';
import { ENV } from '@/constants/env.constants';
import { toast } from 'sonner';
import { getErrorPayload } from './api';
import { isZodErrors } from './assertions';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const getAuthErrorMessage = (error: AuthError) => {
    return error.message;
};

export function getErrorMessage(error: unknown): string {
    if (isAuthError(error)) {
        return getAuthErrorMessage(error);
    }

    if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string'
    ) {
        return error.message;
    }

    if (typeof error === 'string') return error;

    return 'An unexpected error!';
}

export function handleError(
    error: unknown,
    showToast?: boolean
): {
    success: false;
    error: string;
} {
    console.log(error);
    if (isAxiosError(error)) {
        return handleError(
            error.response?.data ?? 'API call failed',
            showToast
        );
    }

    if (ENV.IS_DEV) console.error(error);

    const message = getErrorMessage(error);

    if (showToast) {
        const payload = getErrorPayload(error);

        const isZodErrorPayload = isZodErrors(payload);

        toast.error(message, {
            description: isZodErrorPayload ? (
                <div>
                    {Object.entries(payload).map(([key, property]) => (
                        <div key={key}>
                            <p>{key}:</p>
                            <ul>
                                {property.errors.map((e, idx) => (
                                    <li key={`${key}-${idx}`}>{e}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : undefined,
        });
    }

    return {
        success: false,
        error: message,
    };
}

export const getUrlToPath = (to: string) => {
    const baseUrl = globalThis.location.origin;
    if (!baseUrl) return to;
    return `${baseUrl}${to}`;
};

export const isCurrentUrl = (to: string) =>
    globalThis.location.href === getUrlToPath(to);
