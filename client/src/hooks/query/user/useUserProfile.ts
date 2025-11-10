import { getOneUser } from '@/api/users';
import { KEYS } from '@/constants/query.constants';
import { mapUserFromAPI } from '@/types/models/user.types';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

const useUserProfile = (id?: string) => {
    return useQuery({
        queryKey: KEYS.USER_BY_ID(id),
        queryFn: async () => {
            if (!id) return null;

            try {
                const res = await getOneUser(id);

                const userApi = res.data.user;

                const user = mapUserFromAPI(userApi);

                return user;
            } catch (error) {
                if (isAxiosError(error) && error.response?.status === 404) {
                    return null;
                }
            }
        },
        enabled: !!id,
    });
};

export default useUserProfile;
