import DataTable from '@/components/data-table';
import PageTitle from '@/components/page-title';
import PagesLoader from '@/components/pages-loader';
import { productsColumns } from '@/components/products/table/columns';
import ProductsFilters from '@/components/products/table/filters';
import { GET_PARAMS } from '@/constants/search-params-keys.constants';
import useManyProducts from '@/hooks/query/products/useManyProducts';
import useProductPaginationParams from '@/hooks/useProductPaginationParams';
import { handleError } from '@/lib/utils';
import type { productsFiltersData } from '@/schemas/products.schemas';
import type { PaginationState } from '@tanstack/react-table';

const ProductsTablePage = () => {
    const { productQuery, setSearchParams } = useProductPaginationParams();

    const { data, error, isFetching, isFetched } =
        useManyProducts(productQuery);

    if (error) handleError(error, true);

    const handlePaginationChange = (newState: PaginationState) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);

            const { pageIndex, pageSize } = newState;

            newParams.set(GET_PARAMS.PAGE, pageIndex + 1 + '');
            newParams.set(GET_PARAMS.LIMIT, pageSize + '');

            return newParams;
        });
    };

    const handleFiltersSave = (data: productsFiltersData) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);

            const { text, status, user_id, dates, date } = data;

            if (text) newParams.set(GET_PARAMS.PRODUCT.TEXT, text);
            else newParams.delete(GET_PARAMS.PRODUCT.TEXT);

            if (status) newParams.set(GET_PARAMS.PRODUCT.STATUS, status);
            else newParams.delete(GET_PARAMS.PRODUCT.STATUS);

            if (user_id) newParams.set(GET_PARAMS.PRODUCT.USER_ID, user_id);
            else newParams.delete(GET_PARAMS.PRODUCT.USER_ID);

            if (dates?.from) {
                dates.from.setHours(0, 0, 0, 0);
                newParams.set(GET_PARAMS.DATE_FROM, dates.from.toISOString());
            } else newParams.delete(GET_PARAMS.DATE_FROM);

            if (dates?.to) {
                dates.to.setHours(23, 59, 59, 999);
                newParams.set(GET_PARAMS.DATE_TO, dates.to.toISOString());
            } else newParams.delete(GET_PARAMS.DATE_TO);

            if (date) newParams.set(GET_PARAMS.DATE_TYPE, date);
            else newParams.delete(GET_PARAMS.DATE_TYPE);

            return newParams;
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

export default ProductsTablePage;
