function FunctionalRequestHandlers(opts) {

    const { logger, svcUsers } = opts;

    const test = async function test(request, reply) {
        console.log("FunctionalRequestHandlers > test >");

        logger.info('Inside Non Fat Arrow Handler >');

        reply.send({ ok: true });
    }

    const anotherTest = async (request, reply) => {
        console.log("FunctionalRequestHandlers > anotherTest >");

        logger.info('Inside Fat Arrow Handler >');

        const userAccount = await svcUsers.userTransaction({
            username: 'taskuser',
            password: 'task1234',
            email: 'user@task.com',
            enc_salt: '123456abcde',
            number:'923463312526'
        });

        const user = await svcUsers.userAuth({
            username: 'admin',
            password: 'admin1234',
        })

        console.log("User Object >", user);

        const bindExample = await svcUsers.modifyUsersModel({
            username: 'test',
            password: 'test',
        });

        console.log("bindExample Object >", bindExample);

        reply.send({ ok: true, bindExample, userAccount, user });
    };

    return {
        test,
        anotherTest,
    }
}

module.exports = FunctionalRequestHandlers;