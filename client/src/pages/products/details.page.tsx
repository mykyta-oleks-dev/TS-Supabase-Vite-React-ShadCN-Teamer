import PageTitle from '@/components/page-title';
import PagesLoader from '@/components/pages-loader';
import StatusDisplay from '@/components/products/status';
import useOneProduct from '@/hooks/query/products/useOneProduct';
import { handleError } from '@/lib/utils';
import { useParams } from 'react-router';

const ProductDetailsPage = () => {
    const { id: rawId } = useParams();

    const id = rawId ? Number.parseInt(rawId) : undefined;

    const { data, error, isLoading } = useOneProduct(id);

    if (error) handleError(error, true);

    const descriptionElements =
        data?.product.description.split('\n').map((p) => <p>{p}</p>) ?? [];

    return (
        <div className="relative">
            {isLoading && <PagesLoader />}
            <PageTitle title={`Product "${data?.product.title}"`} />
            {data && (
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="md:flex-1 w-full">
                        <img
                            src={data.product.image}
                            alt={data.product.title}
                            className="object-contain"
                        />
                    </div>
                    <div className="md:flex-1 lg:flex-2">
                        <h3 className="mb-3">
                            <span className="text-lg font-semibold">
                                Status:{' '}
                            </span>
                            <StatusDisplay status={data.product.status} />
                        </h3>

                        <h3 className="text-lg font-semibold mb-3">
                            Description:
                        </h3>
                        <div>{descriptionElements}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsPage;
