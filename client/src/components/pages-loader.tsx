import { cn } from '@/lib/utils';
import { Spinner } from './ui/spinner';

const PagesLoader = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                'absolute inset-0 backdrop-blur-xs flex items-center justify-center z-10',
                className
            )}
        >
            <Spinner className="size-10" />
        </div>
    );
};

export default PagesLoader;
