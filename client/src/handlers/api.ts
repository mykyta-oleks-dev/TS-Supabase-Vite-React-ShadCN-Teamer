import { helloWorld } from '@/api/base';
import { handleError } from '@/lib/utils';
import { toast } from 'sonner';

export const handleHelloWorld = async () => {
    try {
        const res = await helloWorld();

        const data = res.data;

        toast.info(data.message);
    } catch (err) {
        handleError(err, true);
    }
};
