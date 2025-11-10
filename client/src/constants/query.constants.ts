export const KEYS = {
	USERS: ['users'],
	USER_BY_ID: (id?: string | null) => ['users', id],
	TEAMS: ['teams'],
	TEAM_BY_ID: (id?: string | null) => ['teams', id],
} as const;
