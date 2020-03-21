const { hashPassword, check } = require('../../utils');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (root, args) => {
    // Check args
    await check.email(args.email, true);
    await check.username(args.username, true);
    await check.password(args.password);

    // Create user
    const [password, salt] = hashPassword(args.password);
    const user = await User.create({
        ...args,
        password,
        salt,
    });

    // Return JWT token
    return jwt.sign(
        { _id: user._id, username: user.username },
        process.env.SECRET,
        { expiresIn: parseInt(process.env.EXPIRES_IN) },
    );
};
