// const logger = require('src/utils/logging/createLogger')(__filename);
// const { logMsg, errMessage } = require('src/app/schema/loggerFormat/commonFormat');
// const {
//     COMMON_RESPONSE, MESSAGE_TYPE, ERROR_TYPE
// } = require('src/config/constants/Constants');
// const init = require('redis');
// const fs = require('fs');
// const { REDIS } = require('src/config');

// const redisPassword = fs.existsSync(REDIS.PASSWORD)
//     ? fs.readFileSync(REDIS.PASSWORD).toString().replace(/\n$/, '') : REDIS.PASSWORD;

// const redis = init.createClient({
//     port: REDIS.PORT,
//     host: REDIS.HOST,
//     password: redisPassword
// });

// redis.on('connect', () => {
//     logger.info(logMsg(
//         MESSAGE_TYPE.REDIS_INFO,
//         COMMON_RESPONSE.REDIS_CONNECTED
//     ));
// });

// redis.on('error', (error) => {
//     logger.error(logMsg(
//         ERROR_TYPE.REDIS_EXCEPTION,
//         errMessage(error)
//     ));
// });

// module.exports = redis;
