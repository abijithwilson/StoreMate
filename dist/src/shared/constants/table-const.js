"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOREIGN_KEYS = exports.PRIMARY_KEYS = exports.TABLE_NAMES = void 0;
exports.TABLE_NAMES = {
    ADMIN: 'm_admin',
    COUNTRY: 'countries',
    STATE: 'states',
    DISTRICT: 'districts',
    USER: 'm_users',
    STORE: 'm_store',
    STORE_ADMIN_MAP: 't_admin_store_map',
    PRODUCT: 'm_product',
    PRODUCT_SIZE: 'm_size',
    PRODUCT_COLOUR: 'm_colour',
    PRODUCT_CATEGORY: 'm_category',
    PRODUCT_SKU: 'm_sku_table',
    REWARD: 'm_reward',
    ADDRESS: 'm_address',
    BEACON: 'm_beacon',
    SECTION: 'm_section',
    SECTION_STORE_MAP: 't_store_section_map',
    OFFER: 'm_offer',
    PRODUCT_OFFER_MAP: 't_product_offer_map',
    STORE_OFFER_MAP: 't_offer_store_map',
    SECTION_PRODUCT_MAP: 't_section_product_map',
    WISHLIST: 't_wishlist_user'
};
exports.PRIMARY_KEYS = {
    ADMIN: 'admin_id',
    COUNTRY: 'country_id',
    STATE: 'state_id',
    USER: 'id',
    STORE: 'store_id',
    DISTRICT: 'district_id',
    STORE_ADMIN_MAP: 'id',
    PRODUCT: 'id',
    PRODUCT_SIZE: 'id',
    PRODUCT_COLOUR: 'id',
    PRODUCT_CATEGORY: 'id',
    REWARD: 'reward_id',
    PRODUCT_SKU: 'id',
    ADDRESS: 'id',
    BEACON: 'beacon_id',
    SECTION: 'section_id',
    OFFER: 'offer_id',
    PRODUCT_OFFER_MAP: 'id',
    STORE_OFFER_MAP: 'id',
    SECTION_PRODUCT_MAP: 'id',
    WISHLIST: 'id'
};
exports.FOREIGN_KEYS = {
    STORE_ADMIN_MAP: {
        ADMIN: 'admin_id',
        STORE: 'store_id'
    },
    ADDRESS: {
        USER: 'user_id'
    },
    REWARD: {
        STORE: 'store_id'
    },
    SECTION_PRODUCT_MAP: {
        STORE: 'store_id',
        SECTION: 'section_id',
        SKU: 'sku_id',
        PRODUCT: 'product_id'
    }
};
//# sourceMappingURL=table-const.js.map