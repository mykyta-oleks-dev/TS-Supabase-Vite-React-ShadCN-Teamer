import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import type { Status } from '@/types/models/product.types';

const DeleteAction = ({
    status,
    onChangeStatus,
    isPending,
}: {
    status: Status;
    onChangeStatus: (status: Status) => Promise<void>;
    isPending: boolean;
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem disabled={status === 'deleted'}>
                    Delete
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        The product will disappear from public view and marked
                        for a cleanup in 2 weeks. Before the cleanup you will be
                        able to switch the status. After the cleanup the product
                        will be lost irreversably.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            variant="destructive"
                            onClick={() => onChangeStatus('deleted')}
                            disabled={isPending}
                        >
                            Continue
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAction;
