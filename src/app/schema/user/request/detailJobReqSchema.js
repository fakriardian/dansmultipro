const joi = require('joi');

// todo: define your specification and validation on API request data
const detailJobReqSchema = joi.object({
    id: joi.string().guid().required()
});

module.exports = detailJobReqSchema;
