import { PROTECTION_ERRORS } from '@/constants/errors.constants';
import useOneProduct from '@/hooks/query/products/useOneProduct';
import useCurrentUser from '@/hooks/query/user/useCurrentUser';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const useProductUpdateProtection = (id?: number) => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    const {
        query: { data: user },
        isLoading: isLoadingUser,
    } = useCurrentUser();

    const productQuery = useOneProduct(id);

    const { data, isLoading: isLoadingProduct } = productQuery;

    const isLoading = isLoadingProduct || isLoadingUser;

    useEffect(() => {
        if (!id || isLoading) return;

        let error = false;

        if (data?.product.team_id !== user?.team_id) {
            toast.error(PROTECTION_ERRORS.UNAUTHORIZED);

            error = true;
        }

        if (data?.product.status !== 'draft') {
            toast.error(PROTECTION_ERRORS.NOT_IN_DRAFT);

            error = true;
        }

        if (error) {
            setIsAuthorized(false);
        } else {
            setIsAuthorized(true);
        }
    }, [id, data, user, isLoading]);

    return { ...productQuery, isAuthorized };
};

export default useProductUpdateProtection;
