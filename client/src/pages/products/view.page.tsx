import { DataTable } from '@/components/data-table';
import PageTitle from '@/components/page-title';
import { productsColumns } from '@/components/products-table/columns';
import { Spinner } from '@/components/ui/spinner';
import useProducts from '@/hooks/query/products/useProducts';
import { handleError } from '@/lib/utils';

const ViewProducts = () => {
    const { data, error, isLoading } = useProducts();

    if (error) handleError(error, true);

    if (isLoading) return <Spinner />;

    if (!data?.products.length) return <PageTitle title="No products available" />;

	const { products } = data;

    return (
        <div>
            <PageTitle title="Table of team's products" />
            <DataTable columns={productsColumns} data={products} />
        </div>
    );
};

export default ViewProducts;
