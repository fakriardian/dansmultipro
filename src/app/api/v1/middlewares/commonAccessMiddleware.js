const logger = require('src/utils/logging/createLogger')(__filename);
const { logMsg } = require('src/app/schema/loggerFormat/commonFormat');
const { errAccessMsg } = require('src/app/schema/commonResponse');
const {
    HTTP_STATUS_CODE, HTTP_ACCESS, MESSAGE_TYPE, ERROR_TYPE
} = require('src/config/constants/Constants');
const { decodeToken } = require('src/utils/token/tokenOperations');

// todo: you can add more common access validation configuration in this middleware
module.exports = (SCOPE_TYPE) => async (req, res, next) => {
    const { authorization } = req.headers;
    const accessToken = authorization.substring(7, authorization.length);
    const decodedToken = decodeToken(accessToken);

    // todo: uncomment this block of code if scope in jwt token is array type
    // const { scope: { scope } } = decodedToken;
    // if (!scope || !scope.length > 0 || !Array.isArray(scope)) {
    //     loggerFormat.error('Forbidden Access 00x1 - Scope Undefined');
    //     return res.status(403).send('Forbidden Access!');
    // }
    // const upperCasedScopes = scope.map((el) => el.toUpperCase());
    // if (upperCasedScopes.indexOf(SCOPE_TYPE) === -1) {
    //     loggerFormat.error('Forbidden Access 00x2 - Scope Unauthorized');
    //     return res.status(403).send('Forbidden Access!');
    // }

    // todo: comment this block of code if scope in jwt token is array type
    const { scope } = decodedToken;
    if (!scope) {
        logger.error(logMsg(
            ERROR_TYPE.HTTP_ACCESS_EXCEPTION,
            HTTP_ACCESS.FORBIDDEN_ACCESS_SCOPE_UNDEFINED
        ));
        return res.status(403).send(errAccessMsg(
            ERROR_TYPE.HTTP_ACCESS_EXCEPTION,
            HTTP_STATUS_CODE.IS_403,
            HTTP_ACCESS.FORBIDDEN_ACCESS
        ));
    }
    const upperCasedScopes = scope.roleDetail.name.toUpperCase();
    if (!SCOPE_TYPE.includes(upperCasedScopes)) {
        logger.error(logMsg(
            ERROR_TYPE.HTTP_ACCESS_EXCEPTION,
            HTTP_ACCESS.FORBIDDEN_ACCESS_SCOPE_UNAUTHORIZED
        ));
        return res.status(401).send(errAccessMsg(
            ERROR_TYPE.HTTP_ACCESS_EXCEPTION,
            HTTP_STATUS_CODE.IS_401,
            HTTP_ACCESS.UNAUTHORIZED_ACCESS
        ));
    }

    logger.info(logMsg(
        MESSAGE_TYPE.HTTP_ACCESS_INFO,
        HTTP_ACCESS.COMMON_ACCESS_VALIDATED
    ));
    return next();
};
