const logger = require('src/utils/logging/createLogger')(__filename);
const { logMsg, errMessage } = require('src/app/schema/loggerFormat/commonFormat');
const { errAccessMsg } = require('src/app/schema/commonResponse');
const {
    HTTP_STATUS_CODE, ERROR_TYPE, COMMON_RESPONSE
} = require('src/config/constants/Constants');

/* Catch any exceptions / error */
// eslint-disable-next-line func-names
module.exports = function (err, req, res, next) {
    logger.error(logMsg(
        ERROR_TYPE.UNCAUGHT_EXCEPTION,
        errMessage(err)
    ));
    res.status(500).send(errAccessMsg(
        ERROR_TYPE.UNCAUGHT_EXCEPTION,
        HTTP_STATUS_CODE.IS_500,
        COMMON_RESPONSE.SYSTEM_ERROR
    ));
    next();
};
