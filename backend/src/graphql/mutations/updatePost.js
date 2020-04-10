const { Post } = require('../../models');
const { withSession } = require('../../utils');

module.exports = withSession(async (root, args, ctx) => {
    if (!(await Post.exists({ _id: args._id }))) {
        throw new Error(errors.EXISTS_ERROR('POST'));
    }
    return await Post.findByIdAndUpdate({ _id: args._id }, args, {
        new: true,
    });
});
