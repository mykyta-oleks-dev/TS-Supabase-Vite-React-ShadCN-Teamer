import { DataTable } from '@/components/data-table';
import PageTitle from '@/components/page-title';
import PagesLoader from '@/components/pages-loader';
import { productsColumns } from '@/components/products-table/columns';
import useProducts from '@/hooks/query/products/useProducts';
import useProductPaginationParams from '@/hooks/usePaginationSearchParams';
import { handleError } from '@/lib/utils';
import type { PaginationState } from '@tanstack/react-table';

const ViewProducts = () => {
    const { productQuery, setSearchParams } = useProductPaginationParams();

    const { data, error, isFetching, isFetched } = useProducts(productQuery);

    if (error) handleError(error, true);

    const handlePaginationChange = (newState: PaginationState) => {
        setSearchParams((prev) => ({
            ...prev,
            page: newState.pageIndex + 1,
            limit: newState.pageSize,
        }));
    };

    return (
        <div>
            <PageTitle title="Table of team's products" />

            <div className="relative">
                {isFetching && !isFetched && <PagesLoader />}
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
