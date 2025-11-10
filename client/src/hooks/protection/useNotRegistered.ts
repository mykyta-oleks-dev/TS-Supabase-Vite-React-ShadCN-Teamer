import { ROUTES } from '@/constants/router.constants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useCurrentUser from '../query/user/useCurrentUser';

const useNotRegistered = () => {
    const navigate = useNavigate();

    const {
        auth: { session, isLoadingAuth },
        query: { data: user },
        isLoading,
    } = useCurrentUser();

    useEffect(() => {
        if (isLoading) return;

        if (!session) {
            navigate(ROUTES.AUTH.LOG_IN);
        } else if (session && user) {
            navigate(ROUTES.ROOT);
        }
    }, [navigate, session, isLoading, isLoadingAuth, user]);

    return { session };
};

export default useNotRegistered;
