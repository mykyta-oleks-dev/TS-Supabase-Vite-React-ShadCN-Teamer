export const ROUTER_KEYS = {
	ROOT: '/',
	AUTH: {
		ROOT: 'auth',
		LOG_IN: 'log-in',
		SIGN_UP: 'sign-up',
		CREATE_PROFILE: 'create-profile',
		TEAM: 'team',
	},
} as const;

const { AUTH } = ROUTER_KEYS;

export const ROUTES = {
	ROOT: '/',
	AUTH: {
		ROOT: `/${AUTH.ROOT}`,
		LOG_IN: `/${AUTH.ROOT}/${AUTH.LOG_IN}`,
		SIGN_UP: `/${AUTH.ROOT}/${AUTH.SIGN_UP}`,
		CREATE_PROFILE: `/${AUTH.ROOT}/${AUTH.CREATE_PROFILE}`,
		JOIN_OR_CREATE_TEAM: `/${AUTH.ROOT}/${AUTH.TEAM}`,
	},
} as const;
