const { v1: { job: { JobService } } } = require('src/app/services');
const logger = require('src/utils/logging/createLogger')(__filename);
const { logMsg } = require('src/app/schema/loggerFormat/commonFormat');
const { errMessage } = require('src/app/schema/loggerFormat/userFormat');
const { successUserListRes, errUserListMsg } = require('src/app/schema/user/response/listUserResSchema');
const { JOB, HTTP_STATUS_CODE, COMMON_RESPONSE } = require('src/config/constants/Constants');

/**
 * Detail Job
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Promise<Object>} - resolved promise
 */
const retrieveJobHandler = async (req, res) => {
    try {
        const data = req.params.id;
        const result = await JobService.retrieveJob(data);
        return res.status(HTTP_STATUS_CODE.IS_200).send(
            successUserListRes(JOB.DETAIL_SUCCESSFUL_RESPONSE, result)
        );
    } catch (err) {
        logger.error(logMsg(
            JOB.EXCEPTION,
            errMessage(req.body.client, err)
        ));
        return res.status(HTTP_STATUS_CODE.IS_404).send(errUserListMsg(
            COMMON_RESPONSE.RESPONSE_DATA_ERROR,
            HTTP_STATUS_CODE.IS_404,
            `${err}`.replace(/Error: /g, '')
        ));
    }
};

module.exports = retrieveJobHandler;
