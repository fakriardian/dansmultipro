const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const logger = require('src/utils/logging/createLogger')(__filename);
const { logMsg } = require('src/app/schema/loggerFormat/commonFormat');
const { MESSAGE_TYPE, COMMON_RESPONSE } = require('src/config/constants/Constants');
const errorMiddleware = require('src/app/api/v1/middlewares/errorMiddleware');
const { correlationIdMiddleware } = require('src/app/api/v1/middlewares/correlationIdMiddleware/correlation-Id-middleware');
const { requestLoggingMiddleware } = require('src/app/api/v1/middlewares/correlationIdMiddleware/request-logging-middleware');

class App {
    /**
     * App Constructor
     * @param {Object} options - required parameters to run the app
     */
    constructor(options) {
        try {
            Object.assign(this, options);

            this.app = express();
            this.app.use('/static', express.static('static'));

            if (this.corsOptions) {
                this.app.use(cors());
                this.app.options('*', cors());
            }

            // todo: you can change /app with other name depends on the services functionality
            if (this.docs) {
                this.app.use('/app/swagger-ui', swaggerUi.serve, swaggerUi.setup(this.docs));
            }

            this.app.use(express.json());
            this.app.use(express.urlencoded({ extended: true }));
            this.app.use(helmet());
            this.app.use(correlationIdMiddleware);
            this.app.use(requestLoggingMiddleware);

            // this.app.use(passport.authenticate('bearer', { session: false }));

            if (this.routes && this.routes.length !== 0) {
                // initInterceptor();
                this.app.use('', this.routes);
            }

            this.app.use(errorMiddleware);

            if (this.config.PORT) {
                const port = this.config.PORT;
                this.app.listen(port, () => logger.info(logMsg(
                    MESSAGE_TYPE.SYSTEM_INFO,
                    `${COMMON_RESPONSE.PORT_LISTENED} ${port}…`
                )));
            }
        } catch (err) {
            logger.error(err.stack);
        }
    }
}

module.exports = App;
