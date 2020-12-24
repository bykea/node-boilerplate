module.exports = function RequestHeaderHandlers(opts) {

    const verifyApiKey = async function verifyApiKey(request, reply) {
        console.log("RequestHeaderHandlers > verifyApiKey >");

        return;
    }

    return {
        verifyApiKey
    }

}
