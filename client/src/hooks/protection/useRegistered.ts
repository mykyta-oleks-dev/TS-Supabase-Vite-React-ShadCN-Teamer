import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useCurrentUser from '../query/user/useCurrentUser';
import { ROUTES } from '@/constants/router.constants';
import { isCurrentUrl } from '@/lib/utils';

const unauthedRoutes = [
    ROUTES.AUTH.ROOT,
    ROUTES.AUTH.LOG_IN,
    ROUTES.AUTH.SIGN_UP,
    ROUTES.AUTH.CREATE_PROFILE,
    ROUTES.AUTH.JOIN_OR_CREATE_TEAM,
];

const useRegistered = () => {
    const navigate = useNavigate();

    const {
        auth: { session, isLoadingAuth },
        query: { data: user },
        isLoading,
    } = useCurrentUser();

    useEffect(() => {
        if (isLoading) return;

        if (!session) {
            const isLogIn = isCurrentUrl(ROUTES.AUTH.LOG_IN);

            if (!isLogIn) navigate(ROUTES.AUTH.LOG_IN);
        } else if (session && !user) {
            const isCreateProfile = isCurrentUrl(ROUTES.AUTH.CREATE_PROFILE);

            if (!isCreateProfile) navigate(ROUTES.AUTH.CREATE_PROFILE);
        } else if (user && !user.team_id) {
            const isJoinOrCreateTeam = isCurrentUrl(
                ROUTES.AUTH.JOIN_OR_CREATE_TEAM
            );

            if (!isJoinOrCreateTeam) navigate(ROUTES.AUTH.JOIN_OR_CREATE_TEAM);
        } else if (unauthedRoutes.some((route) => isCurrentUrl(route))) {
            navigate(ROUTES.ROOT);
        }
    }, [navigate, session, isLoading, isLoadingAuth, user]);

    return { session };
};

export default useRegistered;
