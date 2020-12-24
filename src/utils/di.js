/* eslint-disable */
const path = require('path');
const nconf = require('nconf');
const awilix = require('awilix');
const pino = require('pino');

const logger = pino({ prettyPrint: true });

const container = awilix.createContainer();

module.exports = async (process) => {
    try {
        nconf.env().argv();

        const env = 'local';

        console.log("Environment File >", path.join(__dirname, '../env', `${env}.json`));

        nconf.file({ file: path.join(__dirname, '../env', `${env}.json`) });

        container.register({
            config: awilix.asValue(nconf),
            logger: awilix.asValue(logger),
        });

        container.loadModules(
            [
    
                '../handlers/**/*.js'
            ],
            {
                cwd: __dirname,
                formatName: 'camelCase',
                resolverOptions: {
                    lifetime: awilix.Lifetime.SINGLETON,
                    register: awilix.asFunction,
                },
            },
        );

    } catch (err) {
        console.log(err);
        process.exit(1);
    } finally {
        return container;
    }
};
