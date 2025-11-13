import { getManyUsers } from '@/api/users';
import { KEYS } from '@/constants/query.constants';
import useAuth from '@/store/auth';
import { mapUserFromAPI } from '@/types/models/user.types';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

const useUsers = () => {
    const session = useAuth(s => s.session);
    
    return useQuery({
        queryKey: KEYS.USERS,
        queryFn: async () => {
            try {
                const res = await getManyUsers();

                const usersApi = res.data.users;

                const users = usersApi.map(u => mapUserFromAPI(u));

                return users;
            } catch (error) {
                if (isAxiosError(error) && error.response?.status === 404) {
                    return null;
                }
            }
        },
        enabled: !!session,
    });
};

export default useUsers;
