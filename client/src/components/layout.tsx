import useRegistered from '@/hooks/protection/auth/useRegistered';
import { Outlet } from 'react-router';
import Navigation from './navigation';
import { useRealtimePresenceRoom } from '@/hooks/use-realtime-presence-room';
import { ROOMS } from '@/constants/realtime.constants';

const Layout = () => {
    const { user } = useRegistered();
    useRealtimePresenceRoom(ROOMS.ONLINE.NAME, user);

    return (
        <div className="w-full md:container md:p-3 min-h-screen grid grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-[180px_1fr] md:grid-rows-1 gap-5">
            <Navigation />
            <main className="px-5 md:p-0 w-full min-h-full">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
