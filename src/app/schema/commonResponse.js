const errAccessMsg = (message, statusCode, errorMessage) => ({
    message,
    error: true,
    code: statusCode,
    errorMessage
});

module.exports = {
    errAccessMsg
};
