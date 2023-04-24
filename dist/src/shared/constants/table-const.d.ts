export declare const TABLE_NAMES: {
    ADMIN: string;
    COUNTRY: string;
    STATE: string;
    DISTRICT: string;
    USER: string;
    STORE: string;
    STORE_ADMIN_MAP: string;
    PRODUCT: string;
    PRODUCT_SIZE: string;
    PRODUCT_COLOUR: string;
    PRODUCT_CATEGORY: string;
    PRODUCT_SKU: string;
    REWARD: string;
    ADDRESS: string;
    BEACON: string;
    SECTION: string;
    SECTION_STORE_MAP: string;
    OFFER: string;
    PRODUCT_OFFER_MAP: string;
    STORE_OFFER_MAP: string;
    SECTION_PRODUCT_MAP: string;
    WISHLIST: string;
};
export declare const PRIMARY_KEYS: {
    ADMIN: string;
    COUNTRY: string;
    STATE: string;
    USER: string;
    STORE: string;
    DISTRICT: string;
    STORE_ADMIN_MAP: string;
    PRODUCT: string;
    PRODUCT_SIZE: string;
    PRODUCT_COLOUR: string;
    PRODUCT_CATEGORY: string;
    REWARD: string;
    PRODUCT_SKU: string;
    ADDRESS: string;
    BEACON: string;
    SECTION: string;
    OFFER: string;
    PRODUCT_OFFER_MAP: string;
    STORE_OFFER_MAP: string;
    SECTION_PRODUCT_MAP: string;
    WISHLIST: string;
};
export declare const FOREIGN_KEYS: {
    STORE_ADMIN_MAP: {
        ADMIN: string;
        STORE: string;
    };
    ADDRESS: {
        USER: string;
    };
    REWARD: {
        STORE: string;
    };
    SECTION_PRODUCT_MAP: {
        STORE: string;
        SECTION: string;
        SKU: string;
        PRODUCT: string;
    };
};
