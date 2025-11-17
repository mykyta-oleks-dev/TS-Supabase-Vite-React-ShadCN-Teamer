import PageTitle from '@/components/page-title';
import PagesLoader from '@/components/pages-loader';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/router.constants';
import useUser from '@/hooks/query/user/useUser';
import { handleError, splitIntoParagraphs } from '@/lib/utils';
import useAuth from '@/store/auth';
import { useNavigate, useParams } from 'react-router';

const ProfileDetailsPage = () => {
    const navigate = useNavigate();
    const session = useAuth((s) => s.session);

    const { id } = useParams();

    const { data: user, isLoading, error } = useUser(id);

    if (error) handleError(error, true);

    const aboutElements = splitIntoParagraphs(user?.about);

    return (
        <div className="relative">
            {isLoading && <PagesLoader />}

            <PageTitle title={`Profile of ${user?.full_name ?? 'user'}`} />

            {!user && <p>User not found</p>}

            {user && (
                <div className="grid sm:grid-cols-[auto_1fr] gap-3">
                    <Avatar className="size-32">
                        <AvatarImage src={user.avatar} />
                    </Avatar>
                    <div className="flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold">About:</h3>
                        <div>{aboutElements}</div>
                    </div>

                    {session?.user.id === id && (
                        <div className="col-span-full flex gap-3 flex-col sm:flex-row">
                            <Button
                                className="flex-1"
                                variant="outline"
                                onClick={() =>
                                    navigate(ROUTES.AUTH.RESET_PASSWORD)
                                }
                            >
                                Change Password
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={() => navigate(ROUTES.PROFILES.EDIT)}
                            >
                                Edit
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileDetailsPage;
