import { ROUTES } from '@/constants/router.constants';
import { handleLogout } from '@/handlers/auth.handlers';
import useAuth from '@/store/auth';
import { useMemo } from 'react';
import { AiFillProduct as AiFillProductIcon } from 'react-icons/ai';
import { FaUser as FaUserIcon } from 'react-icons/fa';
import type { IconType } from 'react-icons/lib';
import { MdHome as MdHomeIcon } from 'react-icons/md';
import NavLink from '../nav-link';
import { OnlineUsersStack } from '../online-users-stack';
import { Button } from '../ui/button';

const NavMenu = () => {
    const session = useAuth((s) => s.session);

    const links: ({
        to: string;
        label: string;
        icon: IconType;
    } | null)[] = useMemo(
        () => [
            { to: ROUTES.ROOT, label: 'Home', icon: MdHomeIcon },
            {
                to: ROUTES.PRODUCTS.ROOT,
                label: 'Products',
                icon: AiFillProductIcon,
            },

            session && {
                to: ROUTES.PROFILES.ONE(session.user.id),
                label: 'Your Profile',
                icon: FaUserIcon,
            },
        ],
        [session]
    );

    return (
        <div className="flex flex-col gap-3 h-full">
            <nav>
                <ul className="flex flex-col gap-3">
                    {links.map((l) => {
                        if (!l) return null;
                        return (
                            <li key={l.to}>
                                <NavLink to={l.to}>
                                    <l.icon size={20} /> {l.label}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <hr />
            <OnlineUsersStack />
            <Button className="mt-auto" onClick={handleLogout}>
                Log Out
            </Button>
        </div>
    );
};

export default NavMenu;
