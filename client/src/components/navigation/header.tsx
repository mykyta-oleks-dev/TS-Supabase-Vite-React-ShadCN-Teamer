import { RiTeamFill as RiTeamFillIcon } from 'react-icons/ri';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../ui/drawer';
import { Button } from '../ui/button';
import { MenuIcon } from 'lucide-react';
import NavMenu from './nav-menu';

const Header = () => {
    return (
        <header className="px-5 py-3 border-b border-primary flex justify-between">
            <h1 className="flex gap-3 items-center text-2xl">
                <RiTeamFillIcon size={30} className="text-primary" />
                <span>Teamer</span>
            </h1>
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
        </header>
    );
};

export default Header;
