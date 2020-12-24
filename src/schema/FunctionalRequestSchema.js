function FunctionalRequestSchema(opts) {

    const { 
        functionalRequestHandlers,
        requestHeaderHandlers, 
        commonRequestHeaders,
    } = opts;

    const test = ({ fastify }) => {
        return {
            method: 'GET',
            url: '/functional/request',
            schema: {
                headers: commonRequestHeaders.apiKeyOnly(),
            },
            handler: functionalRequestHandlers.test,
            onRequest: [requestHeaderHandlers.verifyApiKey, /** */],
        }
    }

    const anotherTest = () => {
        return {
            method: 'GET',
            url: '/another/request',
            handler: functionalRequestHandlers.anotherTest
        }
    };

    return {
        test,
        anotherTest,
    }
}

module.exports = FunctionalRequestSchema;