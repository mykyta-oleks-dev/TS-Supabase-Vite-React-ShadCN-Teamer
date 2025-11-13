import { DataTable } from '@/components/data-table';
import PageTitle from '@/components/page-title';
import PagesLoader from '@/components/pages-loader';
import { productsColumns } from '@/components/products-table/columns';
import ProductsFilters from '@/components/products-table/filters';
import useProducts from '@/hooks/query/products/useProducts';
import useProductPaginationParams from '@/hooks/usePaginationSearchParams';
import { handleError } from '@/lib/utils';
import type { productsFiltersData } from '@/schemas/products.schemas';
import type { PaginationState } from '@tanstack/react-table';

const ViewProducts = () => {
    const { productQuery, setSearchParams } = useProductPaginationParams();

    const { data, error, isFetching, isFetched } = useProducts(productQuery);

    if (error) handleError(error, true);

    const handlePaginationChange = (newState: PaginationState) => {
        setSearchParams((prev) => {
            const { pageIndex, pageSize } = newState;

            prev.set('page', pageIndex + 1 + '');
            prev.set('limit', pageSize + '');

            return prev;
        });
    };

    const handleFiltersSave = (data: productsFiltersData) => {        
        setSearchParams((prev) => {
            const { text, status, user_id } = data;

            if (text) prev.set('text', text);
            else prev.delete('text');
            
            if (status) prev.set('status', status);
            else prev.delete('status');
            
            if (user_id) prev.set('user_id', user_id);
            else prev.delete('user_id');

            return prev;
        });
    };

    return (
        <div>
            <PageTitle title="Table of team's products" />

            <div className="relative">
                {isFetching && !isFetched && <PagesLoader />}
                <ProductsFilters
                    params={productQuery}
                    onFiltersSave={handleFiltersSave}
                />
                <DataTable
                    columns={productsColumns}
                    data={data?.products ?? []}
                    pages={data?.pages ?? 1}
                    params={productQuery}
                    onPaginationChange={handlePaginationChange}
                />
            </div>
        </div>
    );
};

export default ViewProducts;
