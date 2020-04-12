const { withSession } = require('../../utils');
const { Post } = require('../../models');

module.exports = withSession(async (root, { limit, page, ...filter }, ctx) => {
    return await Post.find(
        Object.assign(filter, filter.draft && { user: ctx.user }),
    )
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(limit * page);
});
