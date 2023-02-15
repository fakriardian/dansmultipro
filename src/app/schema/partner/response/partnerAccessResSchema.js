const errPartnerAccessMsg = (message, statusCode, errorMessage) => ({
    message,
    error: true,
    code: statusCode,
    errorMessage
});

module.exports = {
    errPartnerAccessMsg
};
