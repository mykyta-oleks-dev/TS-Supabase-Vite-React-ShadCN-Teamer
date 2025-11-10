import useAuth from '@/store/auth';
import useUserProfile from './useUserProfile';

const useCurrentUser = () => {
    const auth = useAuth();

    const query = useUserProfile(auth.session?.user.id);

    return { query, auth, isLoading: query.isLoading || auth.isLoadingAuth };
};

export default useCurrentUser;
