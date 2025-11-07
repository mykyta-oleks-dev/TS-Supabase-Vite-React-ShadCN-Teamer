import { cn } from '@/lib/utils';
import { Link as RouterLink, type LinkProps } from 'react-router';

const Link = ({ className, ...props }: LinkProps & { className?: string }) => {
    return (
        <RouterLink
            {...props}
            className={cn('cursor-pointer text-primary', className)}
        />
    );
};

export default Link;
