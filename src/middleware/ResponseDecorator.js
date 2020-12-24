/* eslint-disable array-callback-return */
const fp = require('fastify-plugin');

const responseDecorator = (fastify, opts, next) => {

    fastify.addHook('preSerialization', async function onSend(request, reply, payload) {

        fastify.log.trace('request.body > ', { reqId: request.raw.id, body: request.body });
        fastify.log.trace('response.body >', { reqId: request.raw.id, payload });

        return {
            code: 200,
            message: 'success',
            data: payload,
        }
    });

    next();
};

module.exports = fp(responseDecorator, {
    name: 'responseDecorator',
    fastify: '3.x',
});
