export const KEYS = {
	USERS: ['users'],
	USER_BY_ID: (id?: string) => ['users', id],
} as const;
