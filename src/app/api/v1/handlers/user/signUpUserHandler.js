const { v1: { user: { UserService } } } = require('src/app/services');
const logger = require('src/utils/logging/createLogger')(__filename);
const { logMsg } = require('src/app/schema/loggerFormat/commonFormat');
const { errMessage } = require('src/app/schema/loggerFormat/userFormat');
const { successUserListRes, errUserListMsg } = require('src/app/schema/user/response/listUserResSchema');
const { USER, HTTP_STATUS_CODE, COMMON_RESPONSE } = require('src/config/constants/Constants');

/**
 * Sign Up User
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Promise<Object>} - resolved promise
 */
const signUpUserHandler = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await UserService.createUsername(username, password);
        return res.status(HTTP_STATUS_CODE.IS_200).send(
            successUserListRes(
                USER.REGISTER_SUCCESSFUL_RESPONSE,
                result
            )
        );
    } catch (err) {
        logger.error(logMsg(
            USER.EXCEPTION,
            errMessage(req.body, err)
        ));
        return res.status(HTTP_STATUS_CODE.IS_404).send(errUserListMsg(
            COMMON_RESPONSE.RESPONSE_DATA_ERROR,
            HTTP_STATUS_CODE.IS_404,
            `${err}`.replace(/Error: /g, '')
        ));
    }
};

module.exports = signUpUserHandler;
