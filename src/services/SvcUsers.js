/* A Detailed Bind Example Can Also Been Viewed AT /src/helpers/Encryptor.js */
async function modifyUsersModel({ userModel }, arg) {

    const model = userModel;

    console.log("bindExample > Unmodified model >", model);

    const modifiedModel = {
        ...model,
        ...arg,
    }

    console.log("bindExample > Modified model >", modifiedModel);

    return modifiedModel;
}




module.exports = function SvcUsers(opts) {

    const { mdlUsers, db, encryptor } = opts;

    const userTransactionByTask = async (tx, params) => {
        console.log("TX PARAMS >", params);

        const { exists, create } = mdlUsers;

        const createUser = await tx.none(create, params);
        const userExists = await tx.one(exists, {
            id: createUser.id
        })

        return userExists;
    };

    const userTransaction = async function userTransaction(params) {
        /*
            User Account Creation By Task
        */
        const taskResult = await db.primary.task(async (tx) => await userTransactionByTask(tx, params));

        /*
            User Account Creation By Transaction
        */

        //const txResult = await db.primary.tx(async (tx) => await userTransactionByTask(tx, params));

        return {
            task: taskResult,
            transaction: null,
        }
    }

    const userAuth = async function userAuth({ username, password }) {
        const { auth } = mdlUsers;

        /* Password salt has been hardcoded in this example */
        password = await encryptor.hashPassword({ password, salt: '055178eb2cd1168710d9dbcf474e12b2' });

        const user = await db.primary.one(auth, { username, password });

        return user;
    }

    return {
        userTransaction,
        userAuth,
        userExists: async ({ id }) => {
            const { exists } = mdlUsers;

            const user = await db.one(exists, { id });

            return user;
        },
        modifyUsersModel: modifyUsersModel.bind(null, {
            userModel: opts.mdlUsers,
        }),
    }
}