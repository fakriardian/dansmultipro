const express = require('express');

const logger = require('src/utils/logging/createLogger')(__filename);
const { logMsg } = require('src/app/schema/loggerFormat/commonFormat');
const {
    MESSAGE_TYPE, ERROR_TYPE, HEALTH_CHECK
} = require('src/config/constants/Constants');

const router = express.Router();

// todo: you can modify swagger spec for this controller
/**
 * @swagger
 * /v1/health-check:
 *   get:
 *     summary: Get service health status
 *     description: Get service Health status to make sure MS is up.
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/v1/health-check', (req, res) => {
    try {
        const healthStatus = {
            response_code: '00',
            message: HEALTH_CHECK.SUCCESSFUL_RESPONSE
        };
        res.send(healthStatus);
        logger.info(logMsg(
            MESSAGE_TYPE.HEALTH_CHECK_INFO,
            HEALTH_CHECK.SUCCESSFUL_RESPONSE
        ));
    } catch (err) {
        logger.error(logMsg(
            ERROR_TYPE.SYSTEM_ERROR,
            `${HEALTH_CHECK.ERROR_RESPONSE} ${err.stack}`
        ));
    }
});

module.exports = router;
