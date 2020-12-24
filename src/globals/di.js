const awilix = require('awilix');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)
const Boom = require('@hapi/boom');
const _ = require('lodash');

const container = awilix.createContainer();

module.exports = async function FastDI(options = {}) {

    const logger = _.get(options, 'logger', undefined);
    const config = _.get(options, 'config', undefined);

    if (logger === undefined) throw new Error('FastDI is dependent on [logger] instance');

    if (config === undefined) throw new Error('FastDI is dependent on [config] instance');

    container.register({
        config: awilix.asValue(config),
        logger: awilix.asValue(logger),
        Joi: awilix.asValue(Joi),
        Boom: awilix.asValue(Boom),
        _: awilix.asValue(_),
    });

    container.loadModules(
        [
            '../providers/**/*.js',
            '../models/**/*.js',
            '../services/**/*.js',
            '../helpers/**/*.js',
            '../schema/**/*.js',
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

    const _container = async () => container;

    const register = async (type, value) => {
        switch (type) {
            case 'db':
                container.register('db', awilix.asFunction(() => value).singleton());
                break;
            case 'cache':
                container.register('cache', awilix.asFunction(() => value).singleton());
                break;
        }
    }

    return {
        _container,
        register,
    }

}