import PageTitle from '@/components/page-title';
import ProductCreateForm from '@/components/products/form/create';
import { APP_NAME, ROUTES } from '@/constants/router.constants';
import { handleCreateProduct } from '@/handlers/products.handlers';
import type { createProductData } from '@/schemas/products.schemas';
import { useNavigate } from 'react-router';

const ProductNewPage = () => {
    const navigate = useNavigate();

    const handleCreation = async (values: createProductData) => {
        console.log(values);

        const id = await handleCreateProduct(values);

        if (id) navigate(ROUTES.PRODUCTS.ONE(id));
    };

    return (
        <div>
            <title>{`${APP_NAME} - Create new product`}</title>
            <PageTitle title="Create new product" />

            <ProductCreateForm onSubmit={handleCreation} />
        </div>
    );
};

export default ProductNewPage;
