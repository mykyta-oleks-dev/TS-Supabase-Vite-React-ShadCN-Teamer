import { ACCEPTED_IMAGE_TYPES } from './validation.constants';

export const FIELDS = {
    USER: {
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
            ACCEPT: Array.from(ACCEPTED_IMAGE_TYPES).join(','),
        },
        ABOUT: {
            NAME: 'about',
            LABEL: 'About',
            PLACEHOLDER: 'Tell us about yourself',
        },
    },
} as const;
