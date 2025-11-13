import PageTitle from '@/components/page-title';
import TeamMembers from '@/components/team-members';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { handleCopyCode } from '@/handlers/teams.handlers';
import useTeam from '@/hooks/query/team/useTeam';
import useCurrentUser from '@/hooks/query/user/useCurrentUser';
import { handleError } from '@/lib/utils';
import { useState } from 'react';

function HomePage() {
    const [deep, setDeep] = useState(false);

    const {
        query: { data: user, error: userError },
        isLoading,
    } = useCurrentUser();

    const { data: teamData, error: teamError } = useTeam(deep);

    const error = userError ?? teamError;

    if (isLoading || !user || !teamData) return <Spinner />;
    if (error) handleError(error, true);

    const { team, users, usersIsArray, products } = teamData;

    const isLeader = user.id === team.leader_id;

    console.log(teamData);

    return (
        <div className="flex flex-col gap-3 items-start">
            <PageTitle title={`Team "${team.name}"`} className="mb-2">
                {isLeader && (
                    <Button onClick={() => handleCopyCode(team)}>
                        Copy team's code
                    </Button>
                )}
            </PageTitle>
            <h3 className="text-2xl">Hello, {user.full_name}!</h3>
            <p className="text-xl">
                Total active team members: {usersIsArray ? users.length : users}
            </p>
            <p className="text-xl">Total products: {products}</p>
            <Button onClick={() => setDeep((prev) => !prev)}>
                {deep ? 'Hide' : 'Show'} team members
            </Button>

            {deep && usersIsArray && <TeamMembers users={users} />}
        </div>
    );
}

export default HomePage;
