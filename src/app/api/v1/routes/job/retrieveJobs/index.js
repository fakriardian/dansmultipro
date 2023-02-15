const express = require('express');

const router = express.Router();
const { job: { retrieveJobsHandler, validationUserHandler } } = require('src/app/api/v1/handlers');
// todo: enable this line of codes for validating scope inside the bearer token
const { authJwt: { verifyToken } } = require('src/app/api/v1/middlewares');
const { listJobReqSchema: schema } = require('src/app/schema/user/request');

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveJobs:
 *       type: object
 *       optional:
 *         - description
 *         - location
 *         - full_time
 *         - page
 *       properties:
 *         description:
 *           type: string
 *           description: This parameter is aliased to search
 *         location:
 *           type: string
 *           description: location search
 *         ful_time:
 *           type: boolean
 *           description: fillter type is full time
 *         page:
 *           type: number
 *           description: pagination
 */

/**
 * @swagger
 * /v1/job/retrieve:
 *   get:
 *     summary: Retrieve Jobs
 *     description: Retrieve Jobs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: describtion
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *       - in: query
 *         name: full_time
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/v1/job/retrieve', verifyToken, validationUserHandler(schema), retrieveJobsHandler);

module.exports = router;
