const run = async () => {
    const di = await require('./di')(process);

    const { functionalHandler } = di.cradle;

    const { test } = functionalHandler;

    await test();
}

run();