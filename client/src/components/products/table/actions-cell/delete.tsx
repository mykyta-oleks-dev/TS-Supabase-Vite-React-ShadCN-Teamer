import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const DeleteDialog = ({
    onAccept,
    isPending,
    open,
    onOpenChange,
}: {
    onAccept: () => Promise<void>;
    isPending: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
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

                    <Button
                        variant="destructive"
                        onClick={onAccept}
                        disabled={isPending}
                    >
                        Continue
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDialog;
