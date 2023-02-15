require('dotenv').config();

// todo: switch your NODE_ENV to production when deploying to production environment
const CONFIG = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.SERVICE_PORT || 3000,
    HOST: process.env.SERVICE_HOST || 'http://127.0.0.1',
    PATH: process.env.SERVICE_PATH || ':3000/',
    DB: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        dialect: process.env.DB_DIALECT,
        name: process.env.DB_NAME,
        schema: process.env.DB_SCHEMA,
        pool: {
            max: parseInt(process.env.DB_MAX_POOL, 10),
            min: parseInt(process.env.DB_MIN_POOL, 10),
            acquire: parseInt(process.env.DB_ACQUIRE, 10),
            idle: parseInt(process.env.DB_IDLE, 10)
        },
        define: {
            timestamps: false,
            freezeTableName: true
        }
    },
    CERT: {
        PUBLIC_KEY: process.env.CERT_PUBLIC_KEY || './src/certs/public_key.pem',
        PRIVATE_KEY: process.env.CERT_PRIVATE_KEY || './src/certs/private_key.pem'
    }
};

module.exports = CONFIG;
