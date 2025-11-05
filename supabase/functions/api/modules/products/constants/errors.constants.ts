export const PRODUCTS_ERRORS = {
    VALIDATION: 'Product data is invalid',

    NO_ID: 'Product ID is not provided',

    BAD_ID: 'Product ID should be a valid number',

    NOT_CREATED: 'Product was not created',
    NOT_UPDATED: 'Product was not updated',

    NOT_FOUND: 'No product was found',

    FORBIDDEN_UPDATE: "Only members of product's team can update it",
} as const;
