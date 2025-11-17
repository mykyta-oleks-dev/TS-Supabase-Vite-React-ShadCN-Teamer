import PageTitle from '@/components/page-title';
import PagesLoader from '@/components/pages-loader';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useUser from '@/hooks/query/user/useUser';
import { handleError, splitIntoParagraphs } from '@/lib/utils';
import { useParams } from 'react-router';

const ProfileDetailsPage = () => {
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
                <div className="flex gap-3">
                    <Avatar className="size-32">
                        <AvatarImage src={user.avatar} />
                    </Avatar>
                    <div className="flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold">About:</h3>
                        <div>{aboutElements}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDetailsPage;
