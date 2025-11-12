import { getAcceptedImageTypesStr } from './validation.constants';

export const AUTH_FIELDS = {
    EMAIL: {
        NAME: 'email',
        LABEL: 'Email',
        PLACEHOLDER: 'user@mail.com',
        TYPE: 'email',
    },
    PASSWORD: {
        NAME: 'password',
        LABEL: 'Password',
        PLACEHOLDER: '••••••••',
        TYPE: 'password',
    },
    CONFIRM_PASSWORD: {
        NAME: 'confirmPassword',
        LABEL: 'Confirm Password',
        PLACEHOLDER: '••••••••',
        TYPE: 'password',
    },
} as const;

export const USERS_FIELDS = {
    FULL_NAME: {
        NAME: 'full_name',
        LABEL: 'Full Name',
        PLACEHOLDER: 'John Doe',
    },
    AVATAR: {
        NAME: 'avatar',
        LABEL: 'Avatar',
        PLACEHOLDER: 'Select an image file',
        TYPE: 'file',
        ACCEPT: getAcceptedImageTypesStr(),
    },
    ABOUT: {
        NAME: 'about',
        LABEL: 'About',
        PLACEHOLDER: 'Tell us about yourself',
        TEXTAREA: true,
    },
} as const;

export const TEAMS_FIELDS = {
    CODE: {
        NAME: 'code',
        LABEL: 'Team Code',
        PLACEHOLDER: 'ABC123DE45',
    },

    NAME: {
        NAME: 'name',
        LABEL: 'Team Name',
        PLACEHOLDER: 'My Awesome Team',
    },
} as const;

export const PRODUCTS_FILTER_FIELDS = {
    TEXT: {
        NAME: 'text',
        LABEL: 'Search text',
        PLACEHOLDER: 'Succulent chineese meal...',
    },
    STATUS: {
        NAME: 'status',
        LABEL: 'Products status',
    }
} as const;
