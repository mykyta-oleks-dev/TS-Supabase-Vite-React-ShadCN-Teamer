import useCurrentUser from '@/hooks/query/user/useCurrentUser';
import useAuthSubscribe from '@/hooks/useAuthSubscribe';
import { Outlet } from 'react-router';
import PagesLoader from './pages-loader';

const PagesWrapper = () => {
    useAuthSubscribe();

    const { isLoading } = useCurrentUser();

    return (
        <div className="min-h-screen w-full relative flex justify-around items-center">
            {isLoading && <PagesLoader />}
            <Outlet />
        </div>
    );
};

export default PagesWrapper;
