const { hashPassword, errors } = require('../../utils');
const { User } = require('../../models');
const validator = require('validator');
const jwt = require('jsonwebtoken');

module.exports = async (root, args) => {
    // Check args
    if (!validator.isEmail(args.email)) {
        throw new Error(errors.INVALID_ERROR('EMAIL'));
    }

    if (args.password.length < 8) {
        throw new Error(errors.PASSWORD_TOO_SHORT);
    }

    // Check login
    const user = await User.findOne({ email: args.email });
    if (user) {
        const [password] = hashPassword(args.password, user.salt);
        if (password === user.password) {
            // Return JWT
            return jwt.sign({ _id: user._id }, process.env.SECRET, {
                expiresIn: parseInt(process.env.EXPIRES_IN),
            });
        }
    }
    throw new Error(errors.INVALID_ERROR('LOGIN'));
};
