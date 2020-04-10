const { User, Follow } = require('../../models');
const { withSession, errors } = require('../../utils');

module.exports = withSession(async (root, { _id }, ctx) => {
    // Check yourself
    if (_id === ctx.user || !(await User.exists({ _id }))) {
        throw new Error(errors.EXISTS_ERROR('USER'));
    }

    // Check if relationship exist
    const doc = { follower: ctx.user, following: _id };
    if (!(await Follow.exists(doc))) {
        throw new Error(errors.EXISTS_ERROR('FOLLOW'));
    }

    // Remove relationship
    await Follow.remove(doc);
    return true;
});
