import { updateUser } from '@/api/users';
import { KEYS } from '@/constants/query.constants';
import { handleError } from '@/lib/utils';
import type { updateProfileData } from '@/schemas/users.schemas';
import { uploadFile } from '@/storage';
import useAuth from '@/store/auth';
import type { User } from '@/types/models/user.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUserUpdateMutation = () => {
    const queryClient = useQueryClient();
    const session = useAuth((s) => s.session);

    return useMutation({
        mutationFn: async (values: updateProfileData) => {
            if (!session) return;

            const publicUrl =
                values.avatar && (await uploadFile('avatars', values.avatar));

            await updateUser(values, publicUrl);

            return { values, publicUrl };
        },

        onSuccess: (context) => {
            if (!session || !context) return;

            const { values, publicUrl } = context;

            queryClient.setQueryData<User>(
                KEYS.USER_BY_ID(session.user.id),
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        full_name: values.full_name ?? old.full_name,
                        about: values.about ?? old.about,
                        avatar: publicUrl ?? old.avatar,
                    };
                }
            );
        },

        onError: (error) => {
            handleError(error, true);
        },
    });
};

export default useUserUpdateMutation;
