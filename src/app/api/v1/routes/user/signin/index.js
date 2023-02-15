const express = require('express');

const router = express.Router();
const { user: { signInUserHandler, validationUserHandler } } = require('src/app/api/v1/handlers');
// todo: enable this line of codes for validating scope inside the bearer token
const { signInUserReqSchema: schema } = require('src/app/schema/user/request');

/**
 * @swagger
 * components:
 *   schemas:
 *     SignIn:
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
 * /v1/users/signin:
 *   post:
 *     summary: Signin User
 *     description: Signin User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/SignIn'
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/v1/user/signin', validationUserHandler(schema), signInUserHandler);

module.exports = router;
