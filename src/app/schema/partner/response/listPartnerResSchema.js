const successPartnerListRes = (message, result) => ({
    message,
    error: false,
    code: '200',
    result
});

const errPartnerListMsg = (message, statusCode, errorMessage) => ({
    message,
    error: true,
    code: statusCode,
    errorMessage
});

module.exports = {
    successPartnerListRes,
    errPartnerListMsg
};
