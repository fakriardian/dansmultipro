const logger = require('src/utils/logging/createLogger')(__filename);
const tokenOperations = require('src/utils/token/tokenOperations');

/** Validate object to attach all functions to  */
const validate = Object.create(null);

/**
 * Given a token and accessToken this will return either the user or the client associated with
 * the token if valid.  Otherwise this will throw.
 * @param   {Object}  token       - The token
 * @param   {Object}  accessToken - The access token
 * @throws  {Error}   If the token is not valid
 * @returns {Promise} Resolved with the user or client associated with the token if valid
 */

validate.token = (accessToken) => new Promise((resolve, reject) => {
    try {
        tokenOperations.verifyToken(accessToken);
    } catch (err) {
        const error = new Error('invalid_token');
        error.status = 400;
        logger.error(err.stack);
        reject(error);
    }

    resolve(accessToken);
});

module.exports = validate;
