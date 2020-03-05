const { withSession } = require('../../utils');
const { User } = require('../../models');

module.exports = withSession(async (root, args, ctx) => {
    return await User.findById(ctx.user);
});
