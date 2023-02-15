const correlationId = require('src/utils/logging/correlationId');
const { createLogger } = require('src/utils/logging/logger');
const { NODE_ENV } = require('src/config');
const path = require('path');

const logger = (fileName) => createLogger({
    level: (NODE_ENV === ('development' || 'debug')) ? 'debug' : 'info',
    getCorrelationId: correlationId.getId,
    caller: path.basename(fileName)
});

module.exports = logger;
