// todo: enable this line of code for insertion data operation to use uuid as id
// const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('src/utils/logging/createLogger')(__filename);
const { logMsg } = require('src/app/schema/loggerFormat/commonFormat');
const { successMessage } = require('src/app/schema/loggerFormat/userFormat');
const { USER } = require('src/config/constants/Constants');
const { user: { userRepository } } = require('src/app/repository/');
const { CERT: { PUBLIC_KEY } } = require('src/config');

class UserService {
    // eslint-disable-next-line no-useless-constructor, no-empty-function
    constructor() { }

    /**
     * retrieve users data from db
     *
     * @param {String} username - username.
     * @returns {promise<array>} - Resolves to a list of user.
     * @memberof UserService
     */
    static async retrieveUserByUsername(username) {
        try {
            const result = await userRepository.findUserByUsername(username);
            // if (this.isEmpty(result)) throw new Error('No data found');
            logger.info(logMsg(
                USER.INFO,
                successMessage(USER.DETAIL_SUCCESSFUL_RESPONSE)
            ));

            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * retrieve users data from db
     *
     * @param {String} id - id.
     * @returns {promise<array>} - Resolves to a list of user.
     * @memberof UserService
     */
    static async retrieveUserById(id) {
        try {
            const result = await userRepository.findUserById(id);
            if (this.isEmpty(result)) throw new Error('No data found');
            logger.info(logMsg(
                USER.INFO,
                successMessage(USER.DETAIL_SUCCESSFUL_RESPONSE)
            ));

            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * create users data to db
     *
     * @param {String} username - username.
     * @param {String} password - password.
     * @returns {promise<array>} - Resolves to a of user.
     * @memberof UserService
     */
    static async createUsername(username, password) {
        try {
            const hashPassword = bcrypt.hashSync(password, 8);
            const result = await userRepository.createUser(username, hashPassword);
            if (this.isEmpty(result)) throw new Error('No data found');
            logger.info(logMsg(
                USER.INFO,
                successMessage(USER.REGISTER_SUCCESSFUL_RESPONSE)
            ));

            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * generate accress token
     *
     * @param {String} username - username.
     * @param {String} password - password.
     * @returns {promise<String>} - Resolves to a of access token.
     * @memberof UserService
     */
    static async generateAccessToken(username, password) {
        try {
            const user = await this.retrieveUserByUsername(username);
            if (!user) throw new Error('User Not found.');

            const isPasswordValid = bcrypt.compareSync(
                password,
                user.password
            );

            if (!isPasswordValid) throw new Error('Invalid Password!');

            const token = jwt.sign({ id: user.id }, PUBLIC_KEY, {
                expiresIn: 86400 // 24 hours
            });

            if (this.isEmpty(token)) throw new Error('No data found');
            logger.info(logMsg(
                USER.INFO,
                successMessage(USER.LOGIN_SUCCESSFUL_RESPONSE)
            ));

            return { access_token: token };
        } catch (err) {
            throw new Error(err);
        }
    }

    static isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
}

module.exports = UserService;
