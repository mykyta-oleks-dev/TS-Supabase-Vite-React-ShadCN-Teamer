import useRegistered from '@/hooks/protection/useRegistered';
import { Outlet } from 'react-router';
import Navigation from './navigation';

const Layout = () => {
    useRegistered();

    return (
        <div className="w-full md:container md:p-3 min-h-screen grid grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-[2fr_5fr] lg:grid-cols-[1fr_4fr] md:grid-rows-1 gap-5">
            <Navigation />
			<main className='mx-auto'>
				<Outlet />
			</main>
        </div>
    );
};

export default Layout;
