const logger = require('src/utils/logging/createLogger')(__filename);
const { logMsg } = require('src/app/schema/loggerFormat/commonFormat');
const { errMessage } = require('src/app/schema/loggerFormat/userFormat');
const { errUserListMsg } = require('src/app/schema/user/response/listUserResSchema');
const {
    HTTP_STATUS_CODE, USER, COMMON_RESPONSE
} = require('src/config/constants/Constants');

/**
 * Request field validation for temp
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - go tp next handler
 * @returns {Promise<Object>} - resolved promise
 */

module.exports = (schema) => async (req, res, next) => {
    const payload = req.body || req.query;
    try {
        await schema.validateAsync(payload);
        return next();
    } catch (err) {
        logger.error(logMsg(
            USER.EXCEPTION,
            errMessage(req.body, err)
        ));
        return res.status(HTTP_STATUS_CODE.IS_400).send(errUserListMsg(
            COMMON_RESPONSE.REQUEST_DATA_ERROR,
            HTTP_STATUS_CODE.IS_400,
            err.message
        ));
    }
};
