import getSupabase from '@/config/supabase';
import useAuth from '@/store/auth';
import { useEffect } from 'react';

const useAuthSubscribe = () => {
    const authState = useAuth();

    const supabase = getSupabase();

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                authState.setSession(session);
            } else if (event === 'SIGNED_OUT') {
                authState.reset();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, authState]);
};

export default useAuthSubscribe;
