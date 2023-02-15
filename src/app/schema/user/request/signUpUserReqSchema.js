const joi = require('joi');

// todo: define your specification and validation on API request data
const signUpUserReqSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
});

module.exports = signUpUserReqSchema;
