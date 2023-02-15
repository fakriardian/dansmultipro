const express = require('express');

const router = express.Router();
const { job: { retrieveJobHandler, validationUserHandler } } = require('src/app/api/v1/handlers');
// todo: enable this line of codes for validating scope inside the bearer token
const { authJwt: { verifyToken } } = require('src/app/api/v1/middlewares');
const { detailJobReqSchema: schema } = require('src/app/schema/user/request');

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveJob:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: id job position
 */

/**
 * @swagger
 * /v1/job/retrieve/{id}:
 *   get:
 *     summary: Retrieve Job
 *     description: Retrieve Job
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/v1/job/retrieve/:id', verifyToken, validationUserHandler(schema), retrieveJobHandler);

module.exports = router;
