const { withSession } = require('../../utils');
const { Post } = require('../../models');

module.exports = withSession(async (root, { limit, page, ...filter }) => {
    return await Post.find(filter)
        .limit(limit)
        .skip(limit * page);
});
