const { users } = require('src/app/database');

const findUserByUsername = async (username) => {
    const result = await users.findOne({
        where: { username }
    });

    return result;
};

const findUserById = async (id) => {
    const result = await users.findOne({
        where: { id }
    });

    return result;
};

const createUser = async (username, password) => {
    const result = await users.create({
        username, password
    }).then(() => 'User was registered successfully!');

    return result;
};

module.exports = {
    findUserByUsername,
    findUserById,
    createUser
};
