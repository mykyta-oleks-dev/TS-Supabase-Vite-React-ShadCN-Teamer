import PageTitle from '@/components/page-title';
import StatusDisplay from '@/components/products/status';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ROUTES } from '@/constants/router.constants';
import useOneProduct from '@/hooks/query/products/useOneProduct';
import useProductStatusMutationDetails from '@/hooks/query/products/useProductStatusMutationDetails';
import useCurrentUser from '@/hooks/query/user/useCurrentUser';
import { handleError } from '@/lib/utils';
import type { Status } from '@/types/models/product.types';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

const ProductDetailsPage = () => {
    const navigate = useNavigate();

    const { id: rawId } = useParams();

    const {
        query: { data: user },
    } = useCurrentUser();

    const id = rawId ? Number.parseInt(rawId) : undefined;

    const { data, error, isLoading } = useOneProduct(id);

    const { mutateAsync, isPending } = useProductStatusMutationDetails(id);

    if (error) handleError(error, true);

    const descriptionElements =
        data?.product.description
            .split('\n')
            .map((p, idx) => <p key={`desc-p-${idx}_${Date.now()}`}>{p}</p>) ??
        [];

    const handleStatusChange = async (status: Status) => {
        await mutateAsync(status);

        toast.success('Status of the product successfuly changed!');
    };

    if (isLoading)
        return (
            <div className="flex items-center w-full">
                <Spinner />
            </div>
        );

    return (
        <div className="relative">
            <PageTitle title={`Product "${data?.product.title}"`} />
            {data && (
                <div className="flex flex-col gap-3">
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
                    {user?.team_id === data.product.team_id && id && (
                        <div className="flex flex-col md:flex-row gap-3">
                            {data.product.status === 'draft' ? (
                                <Button
                                    className="flex-1"
                                    onClick={() => handleStatusChange('active')}
                                    disabled={isPending}
                                >
                                    Publish
                                </Button>
                            ) : (
                                <Button
                                    className="flex-1"
                                    onClick={() => handleStatusChange('draft')}
                                    disabled={isPending}
                                >
                                    To Drafts
                                </Button>
                            )}
                            <Button
                                className="flex-1"
                                disabled={
                                    isPending || data.product.status !== 'draft'
                                }
                                variant="outline"
                                onClick={() =>
                                    navigate(ROUTES.PRODUCTS.ONE_EDIT(id))
                                }
                            >
                                Edit
                            </Button>
                            <Button
                                className="flex-1"
                                variant="destructive"
                                disabled={
                                    isPending ||
                                    data.product.status === 'deleted'
                                }
                                onClick={() => handleStatusChange('deleted')}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductDetailsPage;
