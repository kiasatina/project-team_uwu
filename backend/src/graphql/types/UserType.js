const { Follow, Post } = require('../../models');
const {
    fileResolver,
    followersResolver,
    followingsResolver,
} = require('../resolvers');

module.exports = {
    followers_count: async root => {
        return await Follow.countDocuments({ following: root._id });
    },
    followers: (root, args) => {
        return followersResolver({
            following: root._id,
            ...args,
        });
    },
    following_count: async root => {
        return await Follow.countDocuments({ follower: root._id });
    },
    following: (root, args) => {
        return followingsResolver({
            follower: root._id,
            ...args,
        });
    },
    profile_image: root => fileResolver(root.profile_image),
    posts_count: async root => {
        return await Post.countDocuments({ user: root._id, draft: false });
    },
    posts: async (root, { limit, page }, ctx) => {
        return await Post.find({ user: ctx.user })
            .limit(limit)
            .skip(page * limit);
    },
};
