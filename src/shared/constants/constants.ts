export const MAX_JSON_REQUEST_SIZE = 10485760;
export const ERROR_CODES = {
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
export const EMAIL_SENT = {
  Success: 'Email send successfully',
  UnSuccess: 'Email sending failed'
};

export const APPLICATION_NAME = 'StoreMate';
export const PASSWORD_RESET = 'Reset your StoreMate password';
export const STORE_ADMIN_INVITATION = 'Store admin invitation';
export const KEYS_TO_IGNORE_IN_ADMIN_UPDATE = ['adminId'];
export const ROLES = ['Super Admin', 'Store Admin'];
export const ROLE_NAME_AND_ID = { SuperAdmin: 1, StoreAdmin: 2 };
export const KEYS_TO_IGNORE_IN_USER_INSERT = ['confirmPassword'];
export const KEYS_TO_IGNORE_IN_STORE_ADMIN_INSERT = ['storeId'];
export const KEYS_TO_IGNORE_IN_STORE_ADMIN_UPDATE = [
  'unassignedId',
  'assignedId'
];
export const KEYS_TO_IGNORE_IN_BEACON_UPDATE = ['beaconId'];
export const SELECT_STORE_UNDER_ADMIN = ['store_id'];
export const SELECT_SECTION_UNDER_STORE = ['id'];
export const SELECT_COUNTRY_COLUMN_DATA = ['country_id', 'country_name'];
export const SELECT_STATE_COLUMN_DATA = ['state_id', 'state_name'];
export const SELECT_DISTRICT_COLUMN_DATA = ['district_id', 'district_name'];
export const SELECT_STORE_COLUMN_DATA = ['store_id', 'store_name'];
export const SELECT_LOGIN_COLUMN_DATA = ['id', 'email', 'password', 'salt'];
export const SELECT_ADMIN_COLUMN_DATA = [
  'admin_id',
  'email',
  'password',
  'salt'
];
export const SELECT_OFFER_DETAILS = [
  'offer_id',
  'offer_title',
  'description',
  'image',
  'TO_CHAR( start_date, \'YYYY-MM-DD\')as start_date',
  'TO_CHAR( end_date, \'YYYY-MM-DD\')as end_date'
];
export const SELECT_BEACON_DROPDOWN_DATA = ['beacon_id', 'name as beacon_name'];
export const SELECT_PRODUCT_UNDER_STORE = ['product_id'];
export const INVALID_ID = 'Invalid Id';
export const STORE_NAME = 'store_name';
export const STORE_ID = 'store_id';
export const SECTION_ID = 'section_id';
export const DISTRICT_NAME = 'district_name';
export const STATE_NAME = 'state_name';
export const COUNTRY_NAME = 'country_name';
export const PRODUCT_NAME = 'product_name';
export const CATEGORY_NAME = 'name';
export const SALE_PRICE = 'sale_price';
export const BASE_PRICE = 'base_price';
export const PRODUCT_IMAGE = 'image';
export const USER_PROFILE_VIEW_COLOUMN_DATA = [
  'id',
  'first_name',
  'last_name',
  'email',
  'phone',
  'reward_points_earned',
  'TO_CHAR(dob, \'YYYY-MM-DD\') as dob',
  'image'
];

export const BEACON_NAME = 'name';
export const EMAIL = 'email';
export const USER_ID = 'id';
export const SUPER_ADMIN = 'Super Admin';
export const STORE_ADMIN = 'Store Admin';
export const USER = 'User';
export const USERTYPE = { ADMIN: 1, USER: 2, STORE_ADMIN: 3 };
export const SELECT_SIZE_COLUMN_DATA = ['id', 'name'];
export const SELECT_COLOUR_COLUMN_DATA = ['id', 'name', 'colour_code'];
export const SELECT_CATEGORY_COLUMN_DATA = ['id', 'name'];
export const SECTION_PRODUCT_LIST_SORT = {
  productName: 'product_name',
  categoryName: 'name',
  basePrice: 'base_price'
};
export const OFFER_LIST_SORT = {
  offers: 'offer_title',
  endDate: 'end_date',
  startDate: 'start_date'
};
export const SORT_ORDER = {
  true: 'ASC',
  false: 'DESC'
};
export const SECTION_SORT = {
  sectionName: 'section_name',
  sectionId: 'section_id'
};
export const SPAN_TYPE = {
  month: 'yyyy-mm',
  year: 'yyyy',
  day: 'yyyy-mm-dd',
  week: 'yyyy-ww'
};
export const APP_PRODUCT_LIST_SORT = {
  productName: 'product_name',
  categoryName: 'category_name',
  price: 'price',
  discount: 'discount_percent',
  discountPrice: 'discount_price',
  updated: 'updated_at'
}