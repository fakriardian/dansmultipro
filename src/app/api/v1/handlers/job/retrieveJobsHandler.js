const { v1: { job: { JobService } } } = require('src/app/services');
const logger = require('src/utils/logging/createLogger')(__filename);
const { logMsg } = require('src/app/schema/loggerFormat/commonFormat');
const { errMessage } = require('src/app/schema/loggerFormat/userFormat');
const { successUserListRes, errUserListMsg } = require('src/app/schema/user/response/listUserResSchema');
const { JOB, HTTP_STATUS_CODE, COMMON_RESPONSE } = require('src/config/constants/Constants');

/**
 * Retrieve Jobs
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {Promise<Object>} - resolved promise
 */
const retrieveJobsHandler = async (req, res) => {
    try {
        const data = req.query;
        const result = await JobService.retrieveJobs(data);
        return res.status(HTTP_STATUS_CODE.IS_200).send(
            successUserListRes(JOB.LIST_SUCCESSFUL_RESPONSE, result)
        );
    } catch (err) {
        logger.error(logMsg(
            JOB.EXCEPTION,
            errMessage(req.body, err)
        ));
        return res.status(HTTP_STATUS_CODE.IS_404).send(errUserListMsg(
            COMMON_RESPONSE.RESPONSE_DATA_ERROR,
            HTTP_STATUS_CODE.IS_404,
            `${err}`.replace(/Error: /g, '')
        ));
    }
};

module.exports = retrieveJobsHandler;
