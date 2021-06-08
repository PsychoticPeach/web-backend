const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    dbuser: process.env.DB_USER,
    dbschema: process.env.DB_SCHEMA,
    dbhost: process.env.DB_HOST,
    dbpass: process.env.DB_PASS,
    token: process.env.TOKEN_SECRET
};