import type { GetProductQueryParams } from "@/types/api";

export const KEYS = {
	USERS: ['users'],
	USER_BY_ID: (id?: string | null) => ['users', id],
	TEAMS: ['teams'],
	TEAM_BY_ID: (id?: string | null) => ['teams', id],
	PRODUCTS: (params?: GetProductQueryParams) => ['products', params],
	PRODUCT_BY_ID: (id?: string | null) => ['products', id],
} as const;
