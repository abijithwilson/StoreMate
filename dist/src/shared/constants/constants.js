"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SORT_ORDER = exports.OFFER_LIST_SORT = exports.SECTION_PRODUCT_LIST_SORT = exports.SELECT_CATEGORY_COLUMN_DATA = exports.SELECT_COLOUR_COLUMN_DATA = exports.SELECT_SIZE_COLUMN_DATA = exports.USERTYPE = exports.USER = exports.STORE_ADMIN = exports.SUPER_ADMIN = exports.USER_ID = exports.EMAIL = exports.BEACON_NAME = exports.USER_PROFILE_VIEW_COLOUMN_DATA = exports.PRODUCT_IMAGE = exports.BASE_PRICE = exports.SALE_PRICE = exports.CATEGORY_NAME = exports.PRODUCT_NAME = exports.COUNTRY_NAME = exports.STATE_NAME = exports.DISTRICT_NAME = exports.SECTION_ID = exports.STORE_ID = exports.STORE_NAME = exports.INVALID_ID = exports.SELECT_PRODUCT_UNDER_STORE = exports.SELECT_BEACON_DROPDOWN_DATA = exports.SELECT_OFFER_DETAILS = exports.SELECT_ADMIN_COLUMN_DATA = exports.SELECT_LOGIN_COLUMN_DATA = exports.SELECT_STORE_COLUMN_DATA = exports.SELECT_DISTRICT_COLUMN_DATA = exports.SELECT_STATE_COLUMN_DATA = exports.SELECT_COUNTRY_COLUMN_DATA = exports.SELECT_SECTION_UNDER_STORE = exports.SELECT_STORE_UNDER_ADMIN = exports.KEYS_TO_IGNORE_IN_BEACON_UPDATE = exports.KEYS_TO_IGNORE_IN_STORE_ADMIN_UPDATE = exports.KEYS_TO_IGNORE_IN_STORE_ADMIN_INSERT = exports.KEYS_TO_IGNORE_IN_USER_INSERT = exports.ROLE_NAME_AND_ID = exports.ROLES = exports.KEYS_TO_IGNORE_IN_ADMIN_UPDATE = exports.STORE_ADMIN_INVITATION = exports.PASSWORD_RESET = exports.APPLICATION_NAME = exports.EMAIL_SENT = exports.ERROR_CODES = exports.MAX_JSON_REQUEST_SIZE = void 0;
exports.APP_PRODUCT_LIST_SORT = exports.SPAN_TYPE = exports.SECTION_SORT = void 0;
exports.MAX_JSON_REQUEST_SIZE = 10485760;
exports.ERROR_CODES = {
    DEFAULT: {
        statusCode: 500,
        message: 'Internal error'
    },
    OK: {
        statusCode: 200,
        message: 'OK'
    },
    UNAUTHORISED: {
        statusCode: 401,
        message: 'Unauthorised'
    },
    Created: {
        statusCode: 201,
        message: 'Created successfully'
    },
    NOTFOUND: {
        statusCode: 404,
        message: 'Not Found'
    },
    FORBIDDEN: {
        statusCode: 403,
        message: 'Forbidden'
    },
    PASSWORDMISSMATCH: {
        statusCode: 400,
        message: 'Password mismatch'
    },
    BADREQUEST: {
        statusCode: 400,
        message: 'Invalid Request'
    },
    Login: {
        statusCode: 200,
        message: 'Login successfull'
    },
    Email: {
        statusCode: 404,
        message: 'Email not found'
    },
    UPDATED: {
        statusCode: 200,
        message: 'Updated successfully'
    },
    UNAUTHORIZED: {
        statusCode: 401,
        message: 'Unauthorized'
    },
    DELETE: {
        statusCode: 200,
        message: 'Deleted successfully'
    }
};
exports.EMAIL_SENT = {
    Success: 'Email send successfully',
    UnSuccess: 'Email sending failed'
};
exports.APPLICATION_NAME = 'StoreMate';
exports.PASSWORD_RESET = 'Reset your StoreMate password';
exports.STORE_ADMIN_INVITATION = 'Store admin invitation';
exports.KEYS_TO_IGNORE_IN_ADMIN_UPDATE = ['adminId'];
exports.ROLES = ['Super Admin', 'Store Admin'];
exports.ROLE_NAME_AND_ID = { SuperAdmin: 1, StoreAdmin: 2 };
exports.KEYS_TO_IGNORE_IN_USER_INSERT = ['confirmPassword'];
exports.KEYS_TO_IGNORE_IN_STORE_ADMIN_INSERT = ['storeId'];
exports.KEYS_TO_IGNORE_IN_STORE_ADMIN_UPDATE = [
    'unassignedId',
    'assignedId'
];
exports.KEYS_TO_IGNORE_IN_BEACON_UPDATE = ['beaconId'];
exports.SELECT_STORE_UNDER_ADMIN = ['store_id'];
exports.SELECT_SECTION_UNDER_STORE = ['id'];
exports.SELECT_COUNTRY_COLUMN_DATA = ['country_id', 'country_name'];
exports.SELECT_STATE_COLUMN_DATA = ['state_id', 'state_name'];
exports.SELECT_DISTRICT_COLUMN_DATA = ['district_id', 'district_name'];
exports.SELECT_STORE_COLUMN_DATA = ['store_id', 'store_name'];
exports.SELECT_LOGIN_COLUMN_DATA = ['id', 'email', 'password', 'salt'];
exports.SELECT_ADMIN_COLUMN_DATA = [
    'admin_id',
    'email',
    'password',
    'salt'
];
exports.SELECT_OFFER_DETAILS = [
    'offer_id',
    'offer_title',
    'description',
    'image',
    'TO_CHAR( start_date, \'YYYY-MM-DD\')as start_date',
    'TO_CHAR( end_date, \'YYYY-MM-DD\')as end_date'
];
exports.SELECT_BEACON_DROPDOWN_DATA = ['beacon_id', 'name as beacon_name'];
exports.SELECT_PRODUCT_UNDER_STORE = ['product_id'];
exports.INVALID_ID = 'Invalid Id';
exports.STORE_NAME = 'store_name';
exports.STORE_ID = 'store_id';
exports.SECTION_ID = 'section_id';
exports.DISTRICT_NAME = 'district_name';
exports.STATE_NAME = 'state_name';
exports.COUNTRY_NAME = 'country_name';
exports.PRODUCT_NAME = 'product_name';
exports.CATEGORY_NAME = 'name';
exports.SALE_PRICE = 'sale_price';
exports.BASE_PRICE = 'base_price';
exports.PRODUCT_IMAGE = 'image';
exports.USER_PROFILE_VIEW_COLOUMN_DATA = [
    'id',
    'first_name',
    'last_name',
    'email',
    'phone',
    'reward_points_earned',
    'TO_CHAR(dob, \'YYYY-MM-DD\') as dob',
    'image'
];
exports.BEACON_NAME = 'name';
exports.EMAIL = 'email';
exports.USER_ID = 'id';
exports.SUPER_ADMIN = 'Super Admin';
exports.STORE_ADMIN = 'Store Admin';
exports.USER = 'User';
exports.USERTYPE = { ADMIN: 1, USER: 2, STORE_ADMIN: 3 };
exports.SELECT_SIZE_COLUMN_DATA = ['id', 'name'];
exports.SELECT_COLOUR_COLUMN_DATA = ['id', 'name', 'colour_code'];
exports.SELECT_CATEGORY_COLUMN_DATA = ['id', 'name'];
exports.SECTION_PRODUCT_LIST_SORT = {
    productName: 'product_name',
    categoryName: 'name',
    basePrice: 'base_price'
};
exports.OFFER_LIST_SORT = {
    offers: 'offer_title',
    endDate: 'end_date',
    startDate: 'start_date'
};
exports.SORT_ORDER = {
    true: 'ASC',
    false: 'DESC'
};
exports.SECTION_SORT = {
    sectionName: 'section_name',
    sectionId: 'section_id'
};
exports.SPAN_TYPE = {
    month: 'yyyy-mm',
    year: 'yyyy',
    day: 'yyyy-mm-dd',
    week: 'yyyy-ww'
};
exports.APP_PRODUCT_LIST_SORT = {
    productName: 'product_name',
    categoryName: 'category_name',
    price: 'price',
    discount: 'discount_percent',
    discountPrice: 'discount_price',
    updated: 'updated_at'
};
//# sourceMappingURL=constants.js.map