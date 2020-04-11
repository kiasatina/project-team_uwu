const { withSession } = require('../../utils');
const { Post } = require('../../models');

module.exports = withSession(async (root, { limit, page, ...filter }, ctx) => {
    return await Post.find(Object.apply(
            filter,
            filter.draft && { user: ctx.user },
        ))
        .limit(limit)
        .skip(limit * page);
});
