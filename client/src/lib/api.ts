import { isApiError } from './assertions';

export function getErrorPayload(error: unknown) {
    if (isApiError(error)) {
        return error.payload;
    }

    return undefined;
}
