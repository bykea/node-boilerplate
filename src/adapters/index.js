const pgsql = require('./pgsql');
const redis = require('./redis');

module.exports = async (opts) => ({
    cache: {
        primary: await redis(opts),
    },
    db: {
        primary: await pgsql(opts),
    }
});