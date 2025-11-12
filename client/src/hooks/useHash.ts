import { setSessionFromHash } from '@/lib/utils';
import { useEffect } from 'react';
import { toast } from 'sonner';

const useHash = () => {
    useEffect(() => {
        const hash = globalThis.location.hash;
        if (hash.includes('error_code=otp_expired')) {
            toast.error(
                'The verification link has expired or is invalid. Please request a new one.'
            );
        }

        if (hash.includes('access_token')) {
            setSessionFromHash(hash);
        }

        globalThis.location.hash = '';
    }, []);
};

export default useHash;
