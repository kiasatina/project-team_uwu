const validator = require('validator');
const hashPassword = require('./hashPassword');
const { User } = require('../models');
const errors = require('./errors');

module.exports = {
    async id(value) {
        if (!validator.isMongoId(value)) {
            throw new Error(errors.INVALID_ERROR('ID'));
        }

        return true;
    },
    async file(value, accept) {
        const { mimetype } = await value;
        if (accept && !mimetype.startsWith(accept)) {
            throw new Error(errors.INVALID_ERROR('FILE'));
        }

        return true;
    },
    async username(value = '', create) {
        if (!validator.isAlphanumeric(value) || validator.isEmpty(value)) {
            throw new Error(errors.INVALID_ERROR('USERNAME'));
        }

        if (create && (await User.exists({ username: value }))) {
            throw new Error(errors.EXISTS_ERROR('USERNAME'));
        }

        return true;
    },
    async email(value = '', create) {
        if (!validator.isEmail(value) || validator.isEmpty(value)) {
            throw new Error(errors.INVALID_ERROR('EMAIL'));
        }

        if (create && (await User.exists({ email: value }))) {
            throw new Error(errors.EXISTS_ERROR('EMAIL'));
        }

        return true;
    },
    async password(value = '', user) {
        if (!validator.isLength(value, { min: 8 })) {
            throw new Error(errors.PASSWORD_TOO_SHORT);
        }

        if (user === null) {
            throw new Error(errors.INVALID_ERROR('LOGIN'));
        }

        if (user) {
            const [password] = hashPassword(value, user.salt);
            if (password !== user.password) {
                throw new Error(errors.INVALID_ERROR('LOGIN'));
            }
        }

        return true;
    },
};
