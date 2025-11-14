import { PROTECTION_ERRORS } from '@/constants/protection.constants';
import useOneProduct from '@/hooks/query/products/useOneProduct';
import useCurrentUser from '@/hooks/query/user/useCurrentUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const useProductAuthorization = (id?: number) => {
    const navigate = useNavigate();

    const {
        query: { data: user },
        isLoading: isLoadingUser,
    } = useCurrentUser();

    const productQuery = useOneProduct(id);

	const { data, isLoading: isLoadingProduct } = productQuery;

    const isLoading = isLoadingProduct || isLoadingUser;

    useEffect(() => {
        if (!id || isLoading) return;

        if (data?.product.team_id !== user?.team_id) {
            toast.error(PROTECTION_ERRORS.UNAUTHORIZED);

            navigate(-1);
        }
    }, [id, navigate, data?.product.team_id, user?.team_id, isLoading]);

	return productQuery;
};

export default useProductAuthorization;
