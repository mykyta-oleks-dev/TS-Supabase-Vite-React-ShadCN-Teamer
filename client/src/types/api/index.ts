import { isStatus, type ProductAPI, type Status } from '../models/product.types';
import type { TeamAPI } from '../models/team.types';
import type { UserAPI } from '../models/user.types';

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
    page: number;
    limit: number;
    orderBy?: string;
    orderByType?: 'desc' | 'asc';
}

export interface GetProductQueryParams extends GetQueryParams {
    text?: string;
    userId?: string;
    status?: Status;
}

export const parseSearchParams = (searchParams: URLSearchParams) => {
    const page = Number.parseInt(searchParams.get('page') ?? '1');
    const limit = Math.max(
        Number.parseInt(searchParams.get('limit') ?? '10'),
        1
    );

    const queryParams: GetQueryParams = { page, limit };

    const orderBy = searchParams.get('orderBy');

    if (orderBy) {
        queryParams.orderBy = orderBy;
    }

    const orderByType = searchParams.get('orderByType');

    if (orderByType === 'asc' || orderByType === 'desc') {
        queryParams.orderByType = orderByType;
    }

    return queryParams;
};

export const parseProductSearchParams = (
    searchParams: URLSearchParams
): GetProductQueryParams => {
    const productQueryParams: GetProductQueryParams =
        parseSearchParams(searchParams);

    const text = searchParams.get('text') ?? searchParams.get('search');

    if (text) {
        productQueryParams.text = text;
    }

    const userId = searchParams.get('userId');

    if (userId) {
        productQueryParams.userId = userId;
    }

    const status = searchParams.get('status');

    if (isStatus(status)) {
        productQueryParams.status = status;
    }

    return productQueryParams;
};
