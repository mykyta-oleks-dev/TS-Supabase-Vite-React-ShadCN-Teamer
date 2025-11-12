import { ROUTES } from '@/constants/router.constants';
import NavLink from '../nav-link';
import { MdHome } from 'react-icons/md';
import type { IconType } from 'react-icons/lib';
import { Button } from '../ui/button';
import { handleLogout } from '@/handlers/auth.handlers';

const links: {
    to: string;
    label: string;
    icon: IconType;
}[] = [{ to: ROUTES.ROOT, label: 'Home', icon: MdHome }];

const NavMenu = () => {
    return (
        <div className="flex flex-col gap-3 h-full">
            <nav>
                <ul className="flex flex-col gap-3">
                    {links.map((l) => (
                        <NavLink key={l.to} to={l.to}>
                            <l.icon size={20} /> {l.label}
                        </NavLink>
                    ))}
                </ul>
            </nav>
            <Button className="mt-auto" onClick={handleLogout}>
                Log Out
            </Button>
        </div>
    );
};

export default NavMenu;
