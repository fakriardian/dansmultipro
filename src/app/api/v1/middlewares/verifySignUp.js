const { v1: { user: { UserService } } } = require('src/app/services');
const { errUserListMsg } = require('src/app/schema/user/response/listUserResSchema');
const {
    HTTP_STATUS_CODE, COMMON_RESPONSE
} = require('src/config/constants/Constants');

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const user = await UserService.retrieveUserByUsername(req.body.username);
    if (user) {
        res.status(HTTP_STATUS_CODE.IS_400).send(errUserListMsg(
            COMMON_RESPONSE.REQUEST_DATA_ERROR,
            HTTP_STATUS_CODE.IS_400,
            'Failed! Username is already in use!'
        ));
        return;
    }
    next();
};

module.exports = {
    checkDuplicateUsernameOrEmail
};
