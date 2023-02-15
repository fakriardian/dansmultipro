const Sequelize = require('sequelize');
const { DB } = require('src/config');
const logger = require('src/utils/logging/createLogger')(__filename);
const { logMsg } = require('src/app/schema/loggerFormat/commonFormat');
const { MESSAGE_TYPE } = require('src/config/constants/Constants');

// todo: define your DB connection parameter here
const sequelize = new Sequelize(
    DB.name,
    DB.user,
    DB.pass,
    {
        host: DB.host,
        port: DB.port,
        dialect: DB.dialect,
        pool: DB.pool,
        define: DB.define,
        schema: DB.schema,
        dialectOptions: {},
        logging: (msg) => logger.debug(logMsg(
            MESSAGE_TYPE.DATABASE_INFO,
            msg
        ))
    }
);

const database = {};
database.sequelize = sequelize;

/** Models Definition */
database.users = require('src/app/models/users')(sequelize, Sequelize);

/** Models relationship */
module.exports = database;
