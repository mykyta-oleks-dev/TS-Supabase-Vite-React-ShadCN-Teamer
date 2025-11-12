import PageTitle from '@/components/page-title';
import useTeam from '@/hooks/query/team/useTeam';
import useCurrentUser from '@/hooks/query/user/useCurrentUser';
import { handleError } from '@/lib/utils';

function HomePage() {
    const {
        query: { data: user, error: userError },
        isLoading,
    } = useCurrentUser();

    const { data: teamData, error: teamError } = useTeam();

    const error = userError ?? teamError;

    if (isLoading) return <div>Loading...</div>;
    if (error) handleError(error);

    if (!user || !teamData)
        return <p>Unexpected error reading user and team data</p>;

    const { team, users, usersIsArray, products } = teamData;

    return (
        <div>
            <PageTitle title={`Team "${team.name}" home page`} />
            <h3 className="text-xl">Hello, {user.full_name}!</h3>
            <p>Total team members: {usersIsArray ? users.length : users}</p>
            <p>Total products: {products}</p>
        </div>
    );
}

export default HomePage;
