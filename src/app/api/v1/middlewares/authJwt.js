const jwt = require('jsonwebtoken');
const { CERT: { PUBLIC_KEY } } = require('src/config');
const { v1: { user: { UserService } } } = require('src/app/services');
const { errAccessMsg } = require('src/app/schema/commonResponse');
const {
    HTTP_STATUS_CODE, HTTP_ACCESS, ERROR_TYPE
} = require('src/config/constants/Constants');

const verifyToken = async (req, res, next) => {
    let accessToken;
    if (
        req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')
    ) {
        // eslint-disable-next-line prefer-destructuring
        accessToken = req.headers.authorization.split(' ')[1];
    }

    if (!accessToken) {
        return res.status(401).send(errAccessMsg(
            ERROR_TYPE.HTTP_ACCESS_EXCEPTION,
            HTTP_STATUS_CODE.IS_401,
            HTTP_ACCESS.UNAUTHORIZED_ACCESS
        ));
    }

    const decoded = jwt.verify(accessToken, PUBLIC_KEY);
    if (!decoded) {
        return res.status(401).send(errAccessMsg(
            ERROR_TYPE.HTTP_ACCESS_EXCEPTION,
            HTTP_STATUS_CODE.IS_401,
            HTTP_ACCESS.UNAUTHORIZED_ACCESS
        ));
    }

    req.userId = decoded.id;

    const user = await UserService.retrieveUserById(decoded.id);
    if (!user) {
        res.status(HTTP_STATUS_CODE.IS_400).send(errAccessMsg(
            ERROR_TYPE.HTTP_ACCESS_EXCEPTION,
            HTTP_STATUS_CODE.IS_400,
            'The user belonging to this token no logger exist'
        ));
    }

    return next();
};

module.exports = {
    verifyToken
};
