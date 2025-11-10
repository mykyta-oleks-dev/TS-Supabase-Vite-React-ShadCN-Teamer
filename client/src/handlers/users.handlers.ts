import { createUser } from '@/api/users';
import queryClient from '@/config/query';
import { KEYS } from '@/constants/query.constants';
import { handleError } from '@/lib/utils';
import type { createProfileData } from '@/schemas/users.schemas';
import { uploadFile } from '@/storage';
import { mapUserFromAPI } from '@/types/models/user.types';

export const handleCreateProfile = async (
    values: createProfileData,
    userId?: string
) => {
    if (!userId) return;

    try {
        const publicUrl = await uploadFile('avatars', values.avatar);

        const res = await createUser(values, publicUrl);

        const userApi = res.data.user;

        const user = mapUserFromAPI(userApi);

        queryClient.setQueryData(KEYS.USER_BY_ID(userId), user);
    } catch (error) {
        handleError(error, true);
    }
};
