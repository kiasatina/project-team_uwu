const { hashPassword, errors } = require('../../utils');
const { User } = require('../../models');
const validator = require('validator');
const jwt = require('jsonwebtoken');

module.exports = async (root, args) => {
    // Check password
    if (password.length < 8) {
        throw new Error(errors.PASSWORD_TOO_SHORT);
    }

    // Check email
    if (!validator.isEmail(args.email)) {
        throw new Error(errors.INVALID_ERROR('EMAIL'));
    }

    if (await User.exists({ email: args.email })) {
        throw new Error(errors.EXISTS_ERROR('EMAIL'));
    }

    // Check username
    if (!validator.isAlphanumeric(args.username)) {
        throw new Error(errors.INVALID_ERROR('USERNAME'));
    }

    if (await User.exists({ username: args.username })) {
        throw new Error(errors.EXISTS_ERROR('USERNAME'));
    }

    // Create user
    const [password, salt] = hashPassword(args.password);
    const user = await User.create({
        ...args,
        password,
        salt,
    });

    // Return JWT token
    return jwt.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: parseInt(process.env.EXPIRES_IN),
    });
};
