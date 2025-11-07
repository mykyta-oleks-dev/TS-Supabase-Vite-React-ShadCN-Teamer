import { getOneUser } from '@/api/users';
import { KEYS } from '@/constants/query.constants';
import { useQuery } from '@tanstack/react-query';

const useUserProfile = (id?: string) => {
    return useQuery({
        queryKey: KEYS.USER_BY_ID(id),
        queryFn: async () => {
            if (!id) return null;
            
            const res = await getOneUser(id);

            const user = res.data.user;

            return user;
        },
    });
};

export default useUserProfile;
