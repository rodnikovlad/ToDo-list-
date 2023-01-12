require('dotenv')
    .config();

const config = {
    port: process.env.PORT,
    host: process.env.HOST
};

module.exports = config;