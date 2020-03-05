const { AUTHENTICATION_ERROR } = require('./errors');

module.exports = handler => async (...args) => {
    if (!args[2].user) {
        throw new Error(AUTHENTICATION_ERROR);
    }

    return await handler(...args);
};
