const uuid = require('../../node_modules/uuid');

const { v1, v3, v4 ,v5 } = uuid;

module.exports = () => {
    return {
        v1: async () => v1(),
        v3: async ({name, namespace}) => v3(name, namespace),
        v4: async () => v4(),
        v4withOptions: async (options) => v4(options),
        v5: async (string, namesapce) => v5(string, namesapce),
        v4WithoutHyphens: async () => v4().split('-').join(''),
    }
}
