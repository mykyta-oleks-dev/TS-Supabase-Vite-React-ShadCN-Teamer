import useAuth from '@/store/auth';
import useUser from './useUser';

const useCurrentUser = () => {
    const auth = useAuth();

    const query = useUser(auth.session?.user.id);

    return { query, auth, isLoading: query.isLoading || auth.isLoadingAuth };
};

export default useCurrentUser;
