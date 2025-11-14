export const SCHEMAS = {
    TITLE: {
        REQUIRED: 'Product title is required',
    },
    DESCRIPTION: {
        REQUIRED: 'Product description is required',
    },
    IMAGE: {
        REQUIRED: 'Image public URL is required',
        INVALID: 'Image has to be a valid URL',
    },
} as const;
