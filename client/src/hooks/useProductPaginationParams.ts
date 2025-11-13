import { parseProductSearchParams } from '@/types/api';
import { useSearchParams } from 'react-router';

const useProductPaginationParams = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        page: '1',
        limit: '10',
    });

	const productQuery = parseProductSearchParams(searchParams);

	return {
		searchParams,
		setSearchParams,
		productQuery,
	}
};

export default useProductPaginationParams;
