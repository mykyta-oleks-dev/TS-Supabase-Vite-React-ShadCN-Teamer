const ROOT_USERS = 'users';

export const API = {
    ROOT: '',
    USERS: {
        ROOT: ROOT_USERS,
        SIGN_UP: `${ROOT_USERS}/sign-up`,
        LOG_IN: `${ROOT_USERS}/log-in`,
        CHANGE_PASSWORD: `${ROOT_USERS}/change-password`,
        VERIFICATION: `${ROOT_USERS}/resend-verification`,
        RESET_PASSWORD: `${ROOT_USERS}/reset-password`,
        ONE: (id: string) => `${ROOT_USERS}/${id}`,
    },
} as const;
