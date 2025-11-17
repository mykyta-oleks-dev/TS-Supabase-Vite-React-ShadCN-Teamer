import { ROOMS } from '@/constants/realtime.constants';
import { MenuIcon } from 'lucide-react';
import { RiTeamFill as RiTeamFillIcon } from 'react-icons/ri';
import { OnlineUsersStack } from '../online-users-stack';
import { Button } from '../ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../ui/drawer';
import NavMenu from './nav-menu';
import { Link } from 'react-router';
import { ROUTES } from '@/constants/router.constants';

const Header = () => {
    return (
        <header className="px-5 py-3 border-b border-primary flex justify-between">
            <Link to={ROUTES.ROOT}>
                <h1 className="flex gap-3 items-center text-2xl">
                    <RiTeamFillIcon size={30} className="text-primary" />
                    <span>Teamer</span>
                </h1>
            </Link>
            <div className="flex gap-3 items-center">
                <OnlineUsersStack maxAvatarsAmount={ROOMS.ONLINE.MAX_HEADER} />
                <Drawer direction="left">
                    <DrawerTrigger asChild>
                        <Button variant="outline" size="icon">
                            <MenuIcon />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="p-5 w-1/2!">
                        <DrawerHeader className="sr-only">
                            <DrawerTitle>Mobile Navigation</DrawerTitle>
                            <DrawerDescription>
                                Navigate through the website
                            </DrawerDescription>
                        </DrawerHeader>
                        <NavMenu />
                    </DrawerContent>
                </Drawer>
            </div>
        </header>
    );
};

export default Header;
