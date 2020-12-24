module.exports = function CommonRequestHeaders(opts) {
    const { Joi } = opts;

    return {
        apiKeyOnly: () => {
            return Joi.object().keys({
                'bl-bkd-key': Joi.string().valid('428c2ca7210279c607be6bc45eab51e6709c3a59').required()
            }).options({ allowUnknown: true });
        },
        clientKeyOnly: () => {
            return Joi.object().keys({
                'x-bb-client-key': Joi.string().required(),
                'x-bb-app-ver': Joi.string().optional().default(null),
            }).options({ allowUnknown: true });
        }
    }
}