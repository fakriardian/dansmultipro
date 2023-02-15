const json = require('morgan-json');

const simpleMorganFormat = json({
    method: ':method',
    url: ':url'
});

const morganFormat = json({
    method: ':method',
    url: ':url',
    status: ':status',
    contentLength: ':res[content-length]',
    responseTime: ':response-time ms'
});

const logFormat = (type, message) => ({
    type,
    message
});

const logMsg = (type, message) => JSON.stringify(logFormat(
    type,
    message
), null, 4);

const errMessage = (error) => ({
    errorMessage: error.message,
    stackTrace: error.stack
});

module.exports = {
    simpleMorganFormat,
    morganFormat,
    logMsg,
    errMessage
};
