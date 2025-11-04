export const TEAMS_ERRORS = {
	VALIDATION: 'Team data is invalid',

	NOT_CREATED: 'Team was not created',
	NOT_UPDATED: 'Team was not updated',

	NOT_FOUND: 'No team was found',

	FORBIDDEN: 'Only leader can update its team',

	BAD_REQ_CODE: 'Provide valid team code 10 characters long (upper case latin letter and/or digits)'
} as const;
