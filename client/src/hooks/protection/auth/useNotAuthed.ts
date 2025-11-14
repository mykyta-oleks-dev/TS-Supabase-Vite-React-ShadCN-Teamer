import { ROUTES } from '@/constants/router.constants';
import useAuth from '@/store/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const useNotAuthed = () => {
    const navigate = useNavigate();

    const session = useAuth((s) => s.session);
    const isLoadingAuth = useAuth((s) => s.isLoadingAuth);

    useEffect(() => {
        if (isLoadingAuth) return;

        if (session) {
            navigate(ROUTES.ROOT);
        }
    }, [navigate, session, isLoadingAuth]);

    return { session };
};

export default useNotAuthed;
