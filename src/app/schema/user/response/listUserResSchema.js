const successUserListRes = (message, result) => ({
    message,
    error: false,
    code: '200',
    result
});

const errUserListMsg = (message, statusCode, errorMessage) => ({
    message,
    error: true,
    code: statusCode,
    errorMessage
});

module.exports = {
    successUserListRes,
    errUserListMsg
};
