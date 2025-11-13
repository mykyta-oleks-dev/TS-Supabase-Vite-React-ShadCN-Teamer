import type { Status } from '@/types/models/product.types';

const StatusDisplay = ({ status }: { status: Status }) => {
    let className = 'text-zinc-500';

    if (status === 'active') className = 'text-green-500';

    if (status === 'deleted') className = 'text-destructive';

    return (
        <span className={className}>
            {status[0].toUpperCase() + status.slice(1)}
        </span>
    );
};

export default StatusDisplay;
