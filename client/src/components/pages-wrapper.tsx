import useAuthSubscribe from '@/hooks/useAuthSubscribe';
import { Outlet } from 'react-router';

const PagesWrapper = () => {
    useAuthSubscribe();
    
    return (
        <div className="min-h-screen w-full flex justify-around items-center">
            <Outlet />
        </div>
    );
};

export default PagesWrapper;
