const joi = require('joi');

// todo: define your specification and validation on API request data
const listPartnerReqSchema = joi.object({
    client: joi.string()
        .token()
        .trim(true)
        .required()
});

module.exports = listPartnerReqSchema;
