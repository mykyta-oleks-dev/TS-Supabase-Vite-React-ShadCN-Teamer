import useAuth from '@/store/auth';
import { Button } from '../components/ui/button';
import { handleHelloWorld } from '../handlers/api';
import useUserProfile from '@/hooks/query/user/useUserProfile';
import { Link } from 'react-router';
import handleLogout from '@/handlers/auth.handlers';

function HomePage() {
    const session = useAuth((s) => s.session);
    const { data, isLoading, error } = useUserProfile(session?.user.id || '');

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-col gap-4 items-center">
            <h1>Hello {data?.fullName ?? 'World'}!</h1>
            <Button onClick={handleHelloWorld}>Hello World</Button>
            <Button asChild>
                <Link to="/auth/log-in">Go to Log In</Link>
            </Button>
            <Button onClick={handleLogout}>
                Log Out
            </Button>
        </div>
    );
}

export default HomePage;
