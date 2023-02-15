const logger = require('src/utils/logging/createLogger')(__filename);
const { logMsg } = require('src/app/schema/loggerFormat/commonFormat');
const { errPartnerAccessMsg } = require('src/app/schema/partner/response/partnerAccessResSchema');
const {
    HTTP_STATUS_CODE, HTTP_ACCESS, MESSAGE_TYPE, ERROR_TYPE
} = require('src/config/constants/Constants');
const { decodeToken } = require('src/utils/token/tokenOperations');

module.exports = () => async (req, res, next) => {
    const { authorization } = req.headers;
    const accessToken = authorization.substring(7, authorization.length);
    const decodedToken = decodeToken(accessToken);
    const {
        sub,
        scope
    } = decodedToken;

    const data = req.body;
    const user = data.client;
    if (scope !== 'ADMIN') {
        if (sub !== user) {
            logger.error(logMsg(
                ERROR_TYPE.HTTP_ACCESS_EXCEPTION,
                HTTP_ACCESS.FORBIDDEN_ACCESS_SCOPE_USER_NOT_VALID
            ));
            return res.status(HTTP_STATUS_CODE.IS_403).send(errPartnerAccessMsg(
                ERROR_TYPE.HTTP_ACCESS_EXCEPTION,
                HTTP_STATUS_CODE.IS_403,
                HTTP_ACCESS.FORBIDDEN_ACCESS
            ));
        }
    }

    logger.info(logMsg(
        MESSAGE_TYPE.HTTP_ACCESS_INFO,
        HTTP_ACCESS.SCOPE_ACCESS_VALIDATED
    ));
    return next();
};
