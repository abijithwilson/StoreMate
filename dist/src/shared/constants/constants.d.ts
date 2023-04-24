export declare const MAX_JSON_REQUEST_SIZE = 10485760;
export declare const ERROR_CODES: {
    DEFAULT: {
        statusCode: number;
        message: string;
    };
    OK: {
        statusCode: number;
        message: string;
    };
    UNAUTHORISED: {
        statusCode: number;
        message: string;
    };
    Created: {
        statusCode: number;
        message: string;
    };
    NOTFOUND: {
        statusCode: number;
        message: string;
    };
    FORBIDDEN: {
        statusCode: number;
        message: string;
    };
    PASSWORDMISSMATCH: {
        statusCode: number;
        message: string;
    };
    BADREQUEST: {
        statusCode: number;
        message: string;
    };
    Login: {
        statusCode: number;
        message: string;
    };
    Email: {
        statusCode: number;
        message: string;
    };
    UPDATED: {
        statusCode: number;
        message: string;
    };
    UNAUTHORIZED: {
        statusCode: number;
        message: string;
    };
    DELETE: {
        statusCode: number;
        message: string;
    };
};
export declare const EMAIL_SENT: {
    Success: string;
    UnSuccess: string;
};
export declare const APPLICATION_NAME = "StoreMate";
export declare const PASSWORD_RESET = "Reset your StoreMate password";
export declare const STORE_ADMIN_INVITATION = "Store admin invitation";
export declare const KEYS_TO_IGNORE_IN_ADMIN_UPDATE: string[];
export declare const ROLES: string[];
export declare const ROLE_NAME_AND_ID: {
    SuperAdmin: number;
    StoreAdmin: number;
};
export declare const KEYS_TO_IGNORE_IN_USER_INSERT: string[];
export declare const KEYS_TO_IGNORE_IN_STORE_ADMIN_INSERT: string[];
export declare const KEYS_TO_IGNORE_IN_STORE_ADMIN_UPDATE: string[];
export declare const KEYS_TO_IGNORE_IN_BEACON_UPDATE: string[];
export declare const SELECT_STORE_UNDER_ADMIN: string[];
export declare const SELECT_SECTION_UNDER_STORE: string[];
export declare const SELECT_COUNTRY_COLUMN_DATA: string[];
export declare const SELECT_STATE_COLUMN_DATA: string[];
export declare const SELECT_DISTRICT_COLUMN_DATA: string[];
export declare const SELECT_STORE_COLUMN_DATA: string[];
export declare const SELECT_LOGIN_COLUMN_DATA: string[];
export declare const SELECT_ADMIN_COLUMN_DATA: string[];
export declare const SELECT_OFFER_DETAILS: string[];
export declare const SELECT_BEACON_DROPDOWN_DATA: string[];
export declare const SELECT_PRODUCT_UNDER_STORE: string[];
export declare const INVALID_ID = "Invalid Id";
export declare const STORE_NAME = "store_name";
export declare const STORE_ID = "store_id";
export declare const SECTION_ID = "section_id";
export declare const DISTRICT_NAME = "district_name";
export declare const STATE_NAME = "state_name";
export declare const COUNTRY_NAME = "country_name";
export declare const PRODUCT_NAME = "product_name";
export declare const CATEGORY_NAME = "name";
export declare const SALE_PRICE = "sale_price";
export declare const BASE_PRICE = "base_price";
export declare const PRODUCT_IMAGE = "image";
export declare const USER_PROFILE_VIEW_COLOUMN_DATA: string[];
export declare const BEACON_NAME = "name";
export declare const EMAIL = "email";
export declare const USER_ID = "id";
export declare const SUPER_ADMIN = "Super Admin";
export declare const STORE_ADMIN = "Store Admin";
export declare const USER = "User";
export declare const USERTYPE: {
    ADMIN: number;
    USER: number;
    STORE_ADMIN: number;
};
export declare const SELECT_SIZE_COLUMN_DATA: string[];
export declare const SELECT_COLOUR_COLUMN_DATA: string[];
export declare const SELECT_CATEGORY_COLUMN_DATA: string[];
export declare const SECTION_PRODUCT_LIST_SORT: {
    productName: string;
    categoryName: string;
    basePrice: string;
};
export declare const OFFER_LIST_SORT: {
    offers: string;
    endDate: string;
    startDate: string;
};
export declare const SORT_ORDER: {
    true: string;
    false: string;
};
export declare const SECTION_SORT: {
    sectionName: string;
    sectionId: string;
};
export declare const SPAN_TYPE: {
    month: string;
    year: string;
    day: string;
    week: string;
};
export declare const APP_PRODUCT_LIST_SORT: {
    productName: string;
    categoryName: string;
    price: string;
    discount: string;
    discountPrice: string;
    updated: string;
};
