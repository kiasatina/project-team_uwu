const { check } = require('../../utils');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (root, args) => {
    // Check args
    await check.email(args.email);
    const user = await User.findOne({ email: args.email });
    await check.password(args.password, user);

    return jwt.sign(
        { _id: user._id, username: user.username },
        process.env.SECRET,
        { expiresIn: parseInt(process.env.EXPIRES_IN) },
    );
};
