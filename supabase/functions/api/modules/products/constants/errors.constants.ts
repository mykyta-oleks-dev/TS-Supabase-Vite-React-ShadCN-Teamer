export const PRODUCTS_ERRORS = {
    VALIDATION: 'Product data is invalid',

    NOT_CREATED: 'Product was not created',
    NOT_UPDATED: 'Product was not updated',

    NOT_FOUND: 'No product was found',

    FORBIDDEN_UPDATE: "Only members of product's team can update it",
} as const;
