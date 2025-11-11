import { ROUTES } from '@/constants/router.constants';
import { handleLogout } from '@/handlers/auth.handlers';
import useTeam from '@/hooks/query/team/useTeam';
import useCurrentUser from '@/hooks/query/user/useCurrentUser';
import { handleError } from '@/lib/utils';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { handleHelloWorld } from '../handlers/api';

function HomePage() {

    const {
        query: { data: userData, error },
        auth: { session },
        isLoading,
    } = useCurrentUser();

    const { data: teamData } = useTeam();

    if (isLoading) return <div>Loading...</div>;
    if (error) handleError(error);

    return (
        <div className="flex flex-col gap-4 items-center">
            <h1>Hello {userData?.full_name ?? 'World'}!</h1>
            <h2>Your team: {teamData?.team.name ?? 'No team'}</h2>
            <Button onClick={handleHelloWorld}>Hello World</Button>
            {!session && (
                <Button asChild>
                    <Link to={ROUTES.AUTH.LOG_IN}>Go to Log In</Link>
                </Button>
            )}
            {session && <Button onClick={handleLogout}>Log Out</Button>}
        </div>
    );
}

export default HomePage;
