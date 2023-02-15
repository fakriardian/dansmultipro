const logger = require('src/utils/logging/createLogger')(__filename);
const { logMsg } = require('src/app/schema/loggerFormat/commonFormat');
const {
    COMMON_RESPONSE, MESSAGE_TYPE, ERROR_TYPE
} = require('src/config/constants/Constants');
const { sequelize } = require('src/app/database');

class HealthCheckService {
    // eslint-disable-next-line no-useless-constructor, no-empty-function
    constructor() { }

    static async checkDBService() {
        try {
            const connection = await sequelize.authenticate();
            logger.info(logMsg(
                MESSAGE_TYPE.SYSTEM_INFO,
                COMMON_RESPONSE.DATABASE_CONNECTED
            ));

            return connection;
        } catch (err) {
            logger.error(logMsg(
                ERROR_TYPE.DATABASE_EXCEPTION,
                `${COMMON_RESPONSE.DATABASE_NOT_CONNECTED}: ${err}`
            ));
        }
        return null;
    }
}

module.exports = HealthCheckService;
