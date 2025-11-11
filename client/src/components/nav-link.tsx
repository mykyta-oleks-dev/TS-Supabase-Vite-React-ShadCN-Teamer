import { cn } from '@/lib/utils';
import { NavLink as RouterNavLink, type NavLinkProps } from 'react-router';

const NavLink = ({ ...props }: NavLinkProps) => {
    return (
        <RouterNavLink
            {...props}
            className={({isActive}) => cn(
                'cursor-pointer w-full h-full px-3 py-2 rounded-3xl border border-secondary transition hover:bg-secondary inline-flex gap-2 items-center text-md',
				isActive ? 'border-primary text-primary' : 'border-secondary',
                props.className
            )}
        />
    );
};

export default NavLink;
