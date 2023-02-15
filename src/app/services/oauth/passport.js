const passport = require('passport');
const { Strategy: BearerStrategy } = require('passport-http-bearer');
const validate = require('src/utils/token/validate');

/**
 * BasicStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */

/**
 * SAMPLE CODE
 * const { BasicStrategy } = require('passport-http');
 * passport.use(new BasicStrategy(async (clientId, clientSecret, done) => {

     const service = new Service();
     const client = await service.validateClient(clientId, clientSecret)
     .catch((err) => done(err));

     done(null, client);
}));
 */

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token).  If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 *
 * To keep this example simple, restricted scopes are not implemented, and this is just for
 * illustrative purposes
 */
passport.use(new BearerStrategy((accessToken, done) => {
    validate.token(accessToken)
        .then((token) => done(null, token, { scope: '*' }))
        .catch(() => done(null, false));
}));
