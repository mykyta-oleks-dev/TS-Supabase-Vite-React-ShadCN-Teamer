export const USERS_ERRORS = {
    VALIDATION: {
        AUTH: 'Authentication data is not valid',
        PROFILE: 'Profile data is not valid',
    },

    PROFILE_NOT_CREATED: 'Profile was not created',
    NO_ID: 'No ID provided',

    NOT_FOUND: 'No user is found',
    NOT_IN_TEAM: 'User has not joined team',
} as const;
