/* eslint-disable array-callback-return */
const fp = require('fastify-plugin');

const errorDecorator = (fastify, opts, next) => {

    fastify.setErrorHandler(function errorHandler(error, request, reply) {
        const { _, Boom } = fastify.di().cradle;
        // if "joi" error object
        if (error && error.isJoi) {
            error = Boom.badRequest(error.message, error.details);
        }

        // if "boom" error object
        if (error && error.isBoom) {
            const _code = _.get(error, 'output.statusCode', 500);
            const _payload = Object.assign(error.output.payload, { data: error.data }, { message: error.message });

            // change "statusCode" to "code"
            _.set(_payload, 'code', _code);
            _.unset(_payload, 'statusCode');

            // remove "data" if "null"
            if (_.isNull(_payload.data))
                _.unset(_payload, 'data');

            // respond
            reply
                .code(_code)
                .type('application/json')
                .headers(error.output.headers)
                .send(_payload);

            return;
        }

        reply.send(error || new boom('Got non-error: ' + error));

    });

    next();
};

module.exports = fp(errorDecorator, {
    name: 'bykea-errorDecorator',
    fastify: '3.x',
});
