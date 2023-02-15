const joi = require('joi');

// todo: define your specification and validation on API request data
const listJobReqSchema = joi.object({
    description: joi.string().optional(),
    location: joi.string().optional(),
    full_time: joi.boolean().optional(),
    page: joi.number().optional()
});

module.exports = listJobReqSchema;
