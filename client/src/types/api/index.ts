import { validateDateString } from '@/lib/validation';
import {
    isStatus,
    type ProductAPI,
    type Status,
} from '../models/product.types';
import type { TeamAPI } from '../models/team.types';
import type { UserAPI } from '../models/user.types';
import { GET_PARAMS } from '@/constants/search-params-keys.constants';

export interface DefaultBody {
    message: string;
}

export interface ApiError extends DefaultBody {
    status: 'error' | 'fail';
    stack?: string;
    errors?: unknown;
    payload?: unknown;
}

export interface AuthToken extends DefaultBody {
    access_token: string;
    refresh_token: string;
}

export interface OneUser extends DefaultBody {
    user: UserAPI;
}

export interface ManyUsers extends DefaultBody {
    users: UserAPI[];
}

export interface OneTeam extends DefaultBody {
    team: TeamAPI;
    users: unknown;
    products: number;
}

export interface OneTeamCount extends OneTeam {
    users: number;
}

export interface OneTeamArray extends OneTeam {
    users: UserAPI[];
}

export const isWithCount = (res: OneTeam): res is OneTeamCount =>
    typeof res.users === 'number';

export const isWithArray = (res: OneTeam): res is OneTeamArray =>
    Array.isArray(res.users);

export interface ManyProducts extends DefaultBody {
    products: ProductAPI[];
    total: number;
    pages: number;
    limit: number;
    totalDeleted: number;
    totalDrafts: number;
}

export interface GetQueryParams {
    [GET_PARAMS.PAGE]: number;
    [GET_PARAMS.LIMIT]: number;
    [GET_PARAMS.ORDER_BY]?: string;
    [GET_PARAMS.ORDER_BY_TYPE]?: 'desc' | 'asc';
    [GET_PARAMS.DATE_FROM]?: Date;
    [GET_PARAMS.DATE_TO]?: Date;
    [GET_PARAMS.DATE_TYPE]?: 'created_at' | 'updated_at';
}

export interface GetProductQueryParams extends GetQueryParams {
    [GET_PARAMS.PRODUCT.TEXT]?: string;
    [GET_PARAMS.PRODUCT.USER_ID]?: string;
    [GET_PARAMS.PRODUCT.STATUS]?: Status;
}

export const parseSearchParams = (searchParams: URLSearchParams) => {
    const page = Number.parseInt(searchParams.get(GET_PARAMS.PAGE) ?? '1');
    const limit = Math.max(
        Number.parseInt(searchParams.get(GET_PARAMS.LIMIT) ?? '10'),
        1
    );

    const queryParams: GetQueryParams = { page, limit };

    const orderBy = searchParams.get(GET_PARAMS.ORDER_BY);

    if (orderBy) {
        queryParams.orderBy = orderBy;
    }

    const orderByType = searchParams.get(GET_PARAMS.ORDER_BY_TYPE);

    if (orderByType === 'asc' || orderByType === 'desc') {
        queryParams.orderByType = orderByType;
    }

    const dateFrom = validateDateString(searchParams.get(GET_PARAMS.DATE_FROM));
    const dateTo = validateDateString(searchParams.get(GET_PARAMS.DATE_TO));
    const dateType = searchParams.get(GET_PARAMS.DATE_TYPE);

    if (dateFrom) {
        queryParams.dateFrom = dateFrom;
    }

    if (dateTo) {
        queryParams.dateTo = dateTo;
    }

    if (dateFrom || dateTo) {
        queryParams.dateType =
            dateType === 'created_at' || dateType === 'updated_at'
                ? dateType
                : 'created_at';
    }

    return queryParams;
};

export const parseProductSearchParams = (
    searchParams: URLSearchParams
): GetProductQueryParams => {
    const productQueryParams: GetProductQueryParams =
        parseSearchParams(searchParams);

    const text = searchParams.get(GET_PARAMS.PRODUCT.TEXT) ?? searchParams.get(GET_PARAMS.PRODUCT.SEARCH);

    if (text) {
        productQueryParams.text = text;
    }

    const user_id = searchParams.get(GET_PARAMS.PRODUCT.USER_ID);
    const userId = searchParams.get(GET_PARAMS.PRODUCT.USERID);

    if (user_id) {
        productQueryParams.user_id = user_id;
    } else if (userId) {
        productQueryParams.user_id = userId;
    }

    const status = searchParams.get('status');

    if (isStatus(status)) {
        productQueryParams.status = status;
    }

    return productQueryParams;
};
