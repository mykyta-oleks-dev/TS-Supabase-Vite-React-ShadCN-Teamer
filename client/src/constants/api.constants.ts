const ROOT_USERS = 'users';
const ROOT_TEAMS = 'teams';
const ROOT_PRODUCTS = 'products';

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
    TEAMS: {
        ROOT: ROOT_TEAMS,
        ONE: (id: string) => `${ROOT_TEAMS}/${id}`,
        JOIN: `${ROOT_TEAMS}/join`,
    },
    PRODUCTS: {
        ROOT: ROOT_PRODUCTS,
        ONE: (id: string) => `${ROOT_PRODUCTS}/${id}`,
    }
} as const;
