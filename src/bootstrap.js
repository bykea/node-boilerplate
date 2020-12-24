const FastServer = require('./globals/server');
const errorDecorator = require ('./middleware/ErrorDecorator');
const responseDecorator = require('./middleware/ResponseDecorator');

const routes = require('./routes');

module.exports = async (process) => {
    try {
        
        const server = await FastServer({
            process
        });

        await server.registerRoutes({ routes });
        await server.registerMiddleware(errorDecorator);
        await server.registerMiddleware(responseDecorator);

        await server.start();
    } catch (_error) {
        console.error("Fatal Error In Bootstrap > ", _error);
        process.exit(1);
    }
};