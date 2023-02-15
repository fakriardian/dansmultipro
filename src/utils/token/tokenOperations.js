const jwt = require('jsonwebtoken');
// todo: uncomment this method to get valid public key for real jwt verify implementation
// const fs = require('fs');
// const { CERT } = require('../../config');

// todo: uncomment this method to get valid public key for real jwt verify implementation
/** Public certificate used for verification.  Note: you could also use the private key */
// const publicKey = fs.readFileSync(CERT.PUBLIC_KEY);

/**
 * Verifies the token through the jwt library using the public certificate.
 * @param   {String} token - The token to verify
 * @throws  {Error} Error if the token could not be verified
 * @returns {Object} The token decoded and verified
 */
// todo: uncomment this method for real jwt verify implementation
// exports.verifyToken = (token) => jwt.verify(token, publicKey);
// todo: remove this method for real jwt verify implementation and use above line of code
exports.verifyToken = (token) => (token);

exports.decodeToken = (token) => jwt.decode(token);
