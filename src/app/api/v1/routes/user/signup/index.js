const express = require('express');

const router = express.Router();
const { user: { signUpUserHandler, validationUserHandler } } = require('src/app/api/v1/handlers');
// todo: enable this line of codes for validating scope inside the bearer token
const { verifySignUp: { checkDuplicateUsernameOrEmail } } = require('src/app/api/v1/middlewares');
const { signUpUserReqSchema: schema } = require('src/app/schema/user/request');

/**
 * @swagger
 * components:
 *   schemas:
 *     SignUp:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: username for login
 *         password:
 *           type: string
 *           description: password for login
 */

/**
 * @swagger
 * /v1/users/signup:
 *   post:
 *     summary: Signup User
 *     description: Signup User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/SignUp'
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/v1/user/signup', checkDuplicateUsernameOrEmail, validationUserHandler(schema), signUpUserHandler);

module.exports = router;
