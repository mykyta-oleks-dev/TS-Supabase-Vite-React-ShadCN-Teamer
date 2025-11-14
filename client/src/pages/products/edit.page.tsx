import PageTitle from '@/components/page-title';
import ProductUpdateForm from '@/components/products/form/update';
import { Spinner } from '@/components/ui/spinner';
import { PRODUCTS_ERRORS } from '@/constants/errors.constants';
import { ROUTES } from '@/constants/router.constants';
import useProductUpdateProtection from '@/hooks/protection/product/useProductUpdateProtection';
import useProductUpdateMutation from '@/hooks/query/products/useProductUpdateMutation';
import { handleError } from '@/lib/utils';
import type { editProductData } from '@/schemas/products.schemas';
import { useLocation, useNavigate, useParams } from 'react-router';

const ProductEditPage = () => {
    const { id: rawId } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const isNotDefaultLocation = location.key !== 'default';

    const id = rawId ? Number.parseInt(rawId) : undefined;

    const { data, error, isLoading, isAuthorized } =
        useProductUpdateProtection(id);

    const { mutateAsync } = useProductUpdateMutation(id);

    if (isLoading) {
        return (
            <div className="flex items-center">
                <Spinner />
            </div>
        );
    }

    if (error) handleError(error, true);

    if (!data) {
        handleError(PRODUCTS_ERRORS.NOT_FOUND, true);

        if (isNotDefaultLocation) navigate(-1);
        else navigate(ROUTES.PRODUCTS.ROOT);

        return null;
    }

    if (!isAuthorized) {
        if (isNotDefaultLocation) navigate(-1);
        else navigate(ROUTES.PRODUCTS.ROOT);

        return null;
    }

    const handleUpdate = async (values: editProductData) => {
        await mutateAsync(values);

        if (id) navigate(ROUTES.PRODUCTS.ONE(id));
    };

    return (
        <div>
            <PageTitle title="Create new product" />

            <ProductUpdateForm product={data.product} onSubmit={handleUpdate} />
        </div>
    );
};

export default ProductEditPage;
