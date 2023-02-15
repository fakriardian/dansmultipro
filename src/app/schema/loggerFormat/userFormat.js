const errMessage = (filters, error) => ({
    filters,
    errorMessage: error.message,
    stackTrace: error.stack
});

const successMessage = (filters, message) => ({
    filters,
    message
});

module.exports = {
    errMessage,
    successMessage
};
