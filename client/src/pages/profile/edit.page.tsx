import PageTitle from '@/components/page-title';
import PagesLoader from '@/components/pages-loader';
import UpdateProfileForm from '@/components/users/form/update';
import { ROUTES } from '@/constants/router.constants';
import useCurrentUser from '@/hooks/query/user/useCurrentUser';
import useUserUpdateMutation from '@/hooks/query/user/useProductUpdateMutation';
import { handleError } from '@/lib/utils';
import type { updateProfileData } from '@/schemas/users.schemas';
import { useNavigate } from 'react-router';

const ProfileEditPage = () => {
    const navigate = useNavigate();

    const {
        query: { data: user, error },
        isLoading,
    } = useCurrentUser();

    const { mutateAsync } = useUserUpdateMutation();

    if (error) handleError(error, true);

    const handleUpdate = async (values: updateProfileData) => {
        const res = await mutateAsync(values);

        if (res && user) navigate(ROUTES.PROFILES.ONE(user.id));
    };

    return (
        <div className="relative">
            <PageTitle title="Editing your profile" />

            {isLoading && <PagesLoader />}

            {!isLoading && !user && <p>No user found</p>}

            {user && <UpdateProfileForm onSubmit={handleUpdate} user={user} />}
        </div>
    );
};

export default ProfileEditPage;
