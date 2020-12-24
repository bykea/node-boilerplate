/* eslint-disable */
const di = require('../utils/di')(process);

const run = async (process) => {
    di.then(c => {
        const { amqManager } = c.cradle;

        console.log("amqManager >", amqManager);

    })
    .catch(e => {
        console.error("DI ERROR >", e);
    });
    
};

run(process).then(e => {
    console.log("SETUP IS RUNNING >");
})
.catch(e => {
    console.error("SETUP ERROR >", e);
});