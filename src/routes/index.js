module.exports = (fastify, opts, next) => {

    const di = fastify.di().cradle;

    const injections = Object.keys(di);

    const schemas = injections.filter(x => x.indexOf('Schema') !== -1);

    schemas.forEach(r => {
        const requests = Object.keys(di[r]);

        requests.forEach(rq => {

            const request = di[r][rq].apply(di[r], [{ fastify }]);

            fastify.route({ ...request });
        })
    })

    next();

};