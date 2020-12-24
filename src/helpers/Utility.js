/* eslint-disable no-plusplus, no-await-in-loop */
const getUnixTime = () => ((new Date()).getTime() / 1000);

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

const isJWTNotUniform = (jwt) => {
    return (!/^[A-Za-z0-9-]+\.[A-Za-z0-9-]+\.[A-Za-z0-9-_.+/=]*$/.test(jwt));
};

const randomUsername = async () => {
    const a = ['Thandi', 'Babes', 'Babuwa', 'Cold', 'Coldplay', 'Lagaan', 'Lead_Bhai', 'Architect_Bhai'];
    const b = ['1337', 'LEET', 'WHOAMI', 'Beat_It', 'Jugar', 'Phat_Gaya', 'Blaster'];

    const rA = Math.floor(Math.random() * a.length);
    const rB = Math.floor(Math.random() * b.length);

    return a[rA] + b[rB];
};

const randomPassword = async (length = 12) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_*&$#@!';
    let retVal = '';

    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    return retVal;
};

module.exports = (opts) => {
    return {
        getUnixTime: getUnixTime.bind(null),
        asyncForEach: asyncForEach.bind(null),
        isJWTNotUniform: isJWTNotUniform.bind(null),
        randomUsername: randomUsername.bind(null),
        randomPassword: randomPassword.bind(null),
    }
}