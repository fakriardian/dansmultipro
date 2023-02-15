/** todo: do not remove this line for app-module-path
 *    as this is needed to simplify path module declaration in require statements.
 *    You can simplify from this require('../../config'),
 *    to this require('src/config')
 */
require('app-module-path/register');
require('express-async-errors');
const { logMsg, errMessage } = require('src/app/schema/loggerFormat/commonFormat');
const { ERROR_TYPE } = require('src/config/constants/Constants');
const swaggerJSDoc = require('swagger-jsdoc');
const { v1: { healthCheck: { HealthCheckService } } } = require('src/app/services');
const {
    PORT, HOST, PATH
} = require('src/config');

// todo: you can add more routes in this folder
/** application routes */
const routes = require('src/app/api/v1/routes');

// todo: you can add more CORS configuration here, but you're not allowed to remove CORS completely
/** CORS */
const allowedOrigins = ['*'];
const corsOptions = {
    origin(origin, callback) {
        if (!origin) {
            return callback(null, true);
        } /* Allow requests with no origin (like mobile apps or curl requests) */

        if (!allowedOrigins.includes(origin)) {
            const message = 'The CORS policy for this site does not '
                + 'allow access from the specified Origin.';
            return callback(new Error(message), false);
        }

        return callback(null, true);
    },
    optionsSuccessStatus: 200
};

/**
 * todo: you can modify loggerFormat configuration in 'utils/logging/loggerFormat.js'
 *  but you're not allowed to remove loggerFormat completely
 */
/** Logger initialization */
const logger = require('src/utils/logging/createLogger')(__filename);

/** Caught all unhandled rejected promise exceptions */
process.on('unhandledRejection', (error) => {
    throw error;
});

/** Caught all unhandled non-promise exceptions */
process.on('uncaughtException', (error) => {
    // loggerFormat.error(`Uncaught exception = ${error.stack}`);
    logger.error(logMsg(
        ERROR_TYPE.UNCAUGHT_EXCEPTION,
        errMessage(error)
    ));
    process.exit(1);
});

/**
 * todo: you can modify swagger configuration here
 *  but you're not allowed to remove swagger completely
 */
/** Swagger */
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Swagger',
        description: 'Swagger for Node JS API',
        version: '1'
    },
    components: {
        securitySchemes: {
            basicAuth: {
                type: 'http',
                scheme: 'basic',
                in: 'header'
            },
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'x-api-key'
            },
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    servers: [
        {
            url: `${HOST}${PATH}`,
            description: 'Development server'
        }
    ]
};
const swaggerOptions = {
    swaggerDefinition,
    /* Paths to files containing OpenAPI definitions */
    apis: ['./src/app/api/v1/routes/**/*.js'],
    security: [
        {
            basicAuth: [],
            ApiKeyAuth: [],
            bearerAuth: []
        }
    ]
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

/**
 * todo: you can add additional features required for application in this function
 */
/** Application Server initialization */
const App = require('src/app/express');

const startServer = async () => {
    const healthCheck = HealthCheckService.checkDBService();
    return new App({
        config: { PORT },
        corsOptions,
        docs: swaggerSpec,
        routes,
        healthCheck
    });
};

startServer();
