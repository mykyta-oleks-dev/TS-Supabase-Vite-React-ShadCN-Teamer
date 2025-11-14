import DataTable from '@/components/data-table';
import PageTitle from '@/components/page-title';
import PagesLoader from '@/components/pages-loader';
import { productsColumns } from '@/components/products/table/columns';
import ProductsFilters from '@/components/products/table/filters';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/router.constants';
import { handleFiltersSave, handlePaginationChange } from '@/handlers/products.handlers';
import useManyProducts from '@/hooks/query/products/useManyProducts';
import useProductPaginationParams from '@/hooks/useProductPaginationParams';
import { handleError } from '@/lib/utils';
import { Link } from 'react-router';

const ProductsTablePage = () => {
    const { productQuery, setSearchParams } = useProductPaginationParams();

    const { data, error, isFetching, isFetched } =
        useManyProducts(productQuery);

    if (error) handleError(error, true);

    return (
        <div>
            <PageTitle title="Table of team's products">
                <Button asChild>
                    <Link to={ROUTES.PRODUCTS.CREATE}>Create new</Link>
                </Button>
            </PageTitle>

            <div className="relative">
                {isFetching && !isFetched && <PagesLoader />}
                <ProductsFilters
                    params={productQuery}
                    onFiltersSave={(values) => handleFiltersSave(values, setSearchParams)}
                />
                <DataTable
                    columns={productsColumns}
                    data={data?.products ?? []}
                    pages={data?.pages ?? 1}
                    params={productQuery}
                    onPaginationChange={(values) => handlePaginationChange(values, setSearchParams)}
                />
            </div>
        </div>
    );
};

export default ProductsTablePage;
