import { useEffect } from 'react';
import { toast } from 'sonner';

const useHashError = () => {
    useEffect(() => {
        const hash = globalThis.location.hash;
        if (hash.includes('error_code=otp_expired')) {
            toast.error(
                'The verification link has expired or is invalid. Please request a new one.'
            );
        }

        globalThis.location.hash = '';
    }, []);
};

export default useHashError;
