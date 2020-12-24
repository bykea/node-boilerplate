const fastify = require('fastify');
const helmet = require('fastify-helmet');
const fastifyJWT = require('fastify-jwt');
const fastifyCors = require('fastify-cors');

const config = require('./config');
const di = require('./di');
const adapters = require('../adapters');

module.exports = async function FastServer(options) {
    const process = options.process;

    let userOptions = options.options;

    if (userOptions === undefined) userOptions = {};

    if (process === undefined) throw new Error('FastServer is dependent on [process]');

    let _server = null;

    const defaultOptions = {
        logger: {
            level: config.get("fastify").log_level,
            prettyPrint: true,
            serializers: {
                res(res) {
                    return {
                        code: res.code,
                        body: res.body
                    }
                },
                req(req) {
                    return {
                        method: req.method,
                        url: req.url,
                        path: req.path,
                        parameters: req.parameters,
                        headers: req.headers
                    }
                }
            }
        }
    };

    const serverOptions = { ...defaultOptions, ...userOptions };

    if (_server === null) _server = fastify(serverOptions);

    const defaultInitialization = async () => {
        const _di = await di({
            logger: _server.log,
            config
        });

        const _container = await _di._container();

        const _adapters = await adapters(_container.cradle);

        await _di.register('db', _adapters.db, true);
        await _di.register('cache', _adapters.cache, true);

        await decorateServer('di', () => _container);

        _server.setValidatorCompiler(({ schema, method, url, httpPart}) => data => schema.validate(data));
    }

    const defaultMiddleware = async () => {
        _server.register(fastifyJWT, {
            secret: config.get('jwt').secret,
        });

        _server.register(helmet);

        _server.register(fastifyCors);
    }

    const registerRoutes = async ({routes, prefix}) => {
        if(!prefix) prefix = config.get('server').api_prefix;

        _server.register(routes, { prefix });
    }

    const registerMiddleware = async (middleware, options = {}) => {
        _server.register(middleware, options);
    }

    const decorateServer = async function decorateServer(key, value) {
        _server.decorate(key, value);
    };

    const start = async function start() {
        try {

            await defaultInitialization();
            await defaultMiddleware();

            await _server.listen(config.get('server').port, config.get('server').host);
        } catch (_error) {
            console.error("Shutting Down Due To Fatal Exception >");
            console.error("Server Initialization Error >", _error);
            process.exit(1);
        }
    };

    return {
        registerRoutes,
        registerMiddleware,
        decorateServer,
        start,
        fastServer: _server,
    };
}