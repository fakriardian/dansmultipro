const { DB } = require('..');
const { NODE_ENV } = require('..');

const conf = {};

conf.environment = NODE_ENV;
conf.sequelize = {};
conf.sequelize.username = DB.user;
conf.sequelize.password = DB.pass;
conf.sequelize.database = DB.name;
conf.sequelize.host = DB.host;
conf.sequelize.dialect = DB.dialect;
conf.sequelize.port = DB.port;
conf.sequelize.define = {
    schema: 'public',
    charset: 'utf8mb4'
};
conf.sequelize.dialectOptions = {};
conf.ROUND_SALT = 8;
module.exports = conf;
