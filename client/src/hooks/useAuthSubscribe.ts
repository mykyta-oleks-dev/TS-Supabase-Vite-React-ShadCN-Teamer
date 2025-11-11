import getSupabase from '@/config/supabase';
import useAuth from '@/store/auth';
import { useEffect } from 'react';

const useAuthSubscribe = () => {
    const authState = useAuth();
    const { setSession, setIsLoadingAuth, reset } = authState;

    const supabase = getSupabase();

    useEffect(() => {
        setIsLoadingAuth(true);

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if ((event === 'SIGNED_IN' || event === 'PASSWORD_RECOVERY') && session) {
                console.log(session.user.id);
                setSession(session);
            } else if (event === 'SIGNED_OUT' || !session) {
                reset();
            }

            setIsLoadingAuth(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, setSession, setIsLoadingAuth, reset]);
};

export default useAuthSubscribe;
