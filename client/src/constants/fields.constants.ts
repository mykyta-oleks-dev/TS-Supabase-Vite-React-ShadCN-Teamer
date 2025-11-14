import { GET_PARAMS } from './search-params-keys.constants';
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
        NAME: GET_PARAMS.PRODUCT.TEXT,
        LABEL: 'Search text',
        PLACEHOLDER: 'Succulent chineese meal...',
    },
    STATUS: {
        NAME: GET_PARAMS.PRODUCT.STATUS,
        LABEL: 'Products status',
        PLACEHOLDER: 'Select status',
    },
    USER: {
        NAME: GET_PARAMS.PRODUCT.USER_ID,
        LABEL: 'User',
        PLACEHOLDER: 'Select user',
    },
    DATES: {
        NAME: GET_PARAMS.DATES,
        LABEL: 'Dates range',
        PLACEHOLDER: 'Select the range of dates',
    },
    DATE: {
        NAME: GET_PARAMS.DATE_TYPE,
        LABEL: "Date",
        PLACEHOLDER: 'Select the date to filter by',
    },
} as const;

export const PRODUCTS_FORM_FIELDS = {
    TITLE: {
        NAME: 'title',
        LABEL: 'Product title',
        PLACEHOLDER: 'Air Fryer 3000...'
    },
    DESCRIPTION: {
        NAME: 'description',
        LABEL: 'Product description',
        PLACEHOLDER: 'The best deal on the market, this air fryer is...',
    },
    IMAGE: {
        NAME: 'image',
        LABEL: 'Product image',
    }
} as const;
