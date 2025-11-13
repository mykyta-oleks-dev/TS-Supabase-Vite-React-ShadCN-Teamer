export const ROUTER_KEYS = {
	ROOT: '/',
	DYNAMIC: ':id',
	AUTH: {
		ROOT: 'auth',
		LOG_IN: 'log-in',
		SIGN_UP: 'sign-up',
		CREATE_PROFILE: 'create-profile',
		TEAM: 'team',
		RESET_PASSWORD: 'reset-password',
	},
	PRODUCTS: {
		ROOT: 'products',
	}
} as const;

const { AUTH, PRODUCTS } = ROUTER_KEYS;

export const ROUTES = {
	ROOT: '/',
	AUTH: {
		ROOT: `/${AUTH.ROOT}`,
		LOG_IN: `/${AUTH.ROOT}/${AUTH.LOG_IN}`,
		SIGN_UP: `/${AUTH.ROOT}/${AUTH.SIGN_UP}`,
		CREATE_PROFILE: `/${AUTH.ROOT}/${AUTH.CREATE_PROFILE}`,
		JOIN_OR_CREATE_TEAM: `/${AUTH.ROOT}/${AUTH.TEAM}`,
		RESET_PASSWORD: `/${AUTH.ROOT}/${AUTH.RESET_PASSWORD}`,
	},
	PRODUCTS: {
		ROOT: `/${PRODUCTS.ROOT}`,
		ONE: (id: number) => `/${PRODUCTS.ROOT}/${id}`,
	}
} as const;
