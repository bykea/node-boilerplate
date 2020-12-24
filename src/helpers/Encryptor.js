const crypto = require('crypto');

function salt(config) {
    const salt = crypto.randomBytes(config.get('encryption').saltBytes).toString('hex');

    return salt;
};

function hash(password, salt, config) {
    const { rounds } = config.get('encryption');
    const { length } = config.get('encryption');
    const { algo } = config.get('encryption');

    const hash = crypto.pbkdf2Sync(password, salt, rounds, length, algo).toString('hex');

    return hash;
};

function hashPassword({ password, salt }) {
    const plainText = `${password}:${salt}`;

    return crypto.createHmac('sha256', salt).update(plainText).digest('hex');
};

async function compare(userHash, password, salt, config) {
    const computedHash = await hash(password, Buffer.from(salt, 'utf-8'), config);

    return userHash === computedHash;
};

module.exports = () => {
    return {
        salt: salt.bind(null),
        hash: hash.bind(null),
        hashPassword: hashPassword.bind(null),
        compare: compare.bind(null),
    }
}
