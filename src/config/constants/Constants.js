// todo: define required constant here
/** ERROR FLAG */
const ERROR_FLAG = {
    TRUE: 'TRUE',
    FALSE: 'FALSE'
};

/** PARTNER */
const PARTNER = {
    EXCEPTION: 'PARTNER EXCEPTION',
    INFO: 'PARTNER INFO',
    LIST_SUCCESSFUL_RESPONSE: 'Partner listed successfully',
    PROBLEM_DATA: 'Problem on getting Partner data!!'
};
const PARTNER_REQUEST_FIELD = {
    CLIENT: 'client'
};

const USER = {
    EXCEPTION: 'USER EXCEPTION',
    INFO: 'USER INFO',
    REGISTER_SUCCESSFUL_RESPONSE: 'user successfully registered',
    LOGIN_SUCCESS_FUL_RESPONSE: 'user successfully login',
    DETAIL_SUCCESSFUL_RESPONSE: 'user Detail successfully',
    PROBLEM_DATA: 'Problem on getting User data!!'
};

const JOB = {
    EXCEPTION: 'JOB EXCEPTION',
    INFO: 'JOB INFO',
    LIST_SUCCESSFUL_RESPONSE: 'Job List successfully',
    DETAIL_SUCCESSFUL_RESPONSE: 'Job Detail successfully',
    PROBLEM_DATA: 'Problem on getting Job data!!'
};

/** HEALTHCHECK */
const HEALTH_CHECK = {
    SUCCESSFUL_RESPONSE: 'Service is healthy',
    ERROR_RESPONSE: 'Service is not healthy / down'
};

/** HTTP ACCESS RESPONSE */
const HTTP_ACCESS = {
    FORBIDDEN_ACCESS: 'Forbidden Access!',
    UNAUTHORIZED_ACCESS: 'Unauthorized Access!',
    FORBIDDEN_ACCESS_SCOPE_UNDEFINED: 'Forbidden Access 00x1 - Scope Undefined',
    FORBIDDEN_ACCESS_SCOPE_UNAUTHORIZED: 'Forbidden Access 00x1 - Scope Unauthorized',
    FORBIDDEN_ACCESS_SCOPE_USER_NOT_VALID: 'Forbidden Access 00x1 - User is not valid',
    COMMON_ACCESS_VALIDATED: 'Common access validated',
    SCOPE_ACCESS_VALIDATED: 'Scope and Access validated'
};

/** HTTP STATUS CODE */
const HTTP_STATUS_CODE = {
    IS_200: '200',
    IS_201: '201',
    IS_400: '400',
    IS_401: '401',
    IS_404: '404',
    IS_403: '403',
    IS_406: '406',
    IS_422: '422',
    IS_500: '500'
};

/** COMMON RESPONSE */
const COMMON_RESPONSE = {
    ERROR_REQUEST_DATA: 'Error in request data : ',
    SYSTEM_ERROR: 'Internal system error..!!',
    DATABASE_CONNECTED: 'Database Connected',
    DATABASE_NOT_CONNECTED: 'Unable to connect to the database',
    PORT_LISTENED: 'Listening on port',
    REQUEST_DATA_ERROR: 'There is a problem with the request data!!',
    RESPONSE_DATA_ERROR: 'There is a problem with the response data!!'
};

/** RESPONSE TYPE */
const MESSAGE_TYPE = {
    SYSTEM_INFO: 'SYSTEM INFO',
    DATABASE_INFO: 'DATABASE_INFO',
    REST_API: 'REST API',
    HTTP_ACCESS_INFO: 'HTTP ACCESS INFO',
    HEALTH_CHECK_INFO: 'HEALTH CHECK'
};

/** ERROR TYPE */
const ERROR_TYPE = {
    UNCAUGHT_EXCEPTION: 'UNCAUGHT EXCEPTION',
    REDIS_EXCEPTION: 'REDIS EXCEPTION',
    DATABASE_EXCEPTION: 'DATABASE EXCEPTION',
    SYSTEM_ERROR: 'SYSTEM ERROR',
    HTTP_ACCESS_EXCEPTION: 'HTTP ACCESS EXCEPTION'
};

const TABLES = {
    USERS: 'users'
};

module.exports = {
    COMMON_RESPONSE,
    PARTNER,
    USER,
    JOB,
    PARTNER_REQUEST_FIELD,
    HEALTH_CHECK,
    HTTP_ACCESS,
    HTTP_STATUS_CODE,
    ERROR_TYPE,
    ERROR_FLAG,
    MESSAGE_TYPE,
    TABLES
};
