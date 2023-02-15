const morgan = require('morgan');
const logger = require('src/utils/logging/createLogger')(__filename);
const { simpleMorganFormat, morganFormat } = require('src/app/schema/loggerFormat/commonFormat');
const { MESSAGE_TYPE } = require('src/config/constants/Constants');

const morganConfig = {
    stream: {
        write: (text) => logger.info(`{"type":"${MESSAGE_TYPE.REST_API}","message":${text.trim()}}`)
    }
};

const requestLoggingMiddleware = [
    morgan(simpleMorganFormat, { ...morganConfig, immediate: true }),
    morgan(morganFormat, { ...morganConfig, immediate: false })
];

module.exports = { requestLoggingMiddleware };
