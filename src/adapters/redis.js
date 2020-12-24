const IORedis = require('ioredis');

module.exports = async ({ logger, config }) => {
    const dbConfig = config.get('cache').redis;

    const client = new IORedis(dbConfig.port, dbConfig.host);

    client
        .on('ready', () => {
            logger.info('REDIS_EVENT [ready]');
        })
        .on('error', (err) => {
            logger.error(`REDIS_EVENT [error] ${err.message}`);
        })
        .on('end', () => {
            logger.info('REDIS_EVENT [disconnect]');
        });

    return client;
}