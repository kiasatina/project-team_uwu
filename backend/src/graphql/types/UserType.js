const { Follow, Post } = require('../../models');
const {
    fileResolver,
    followersResolver,
    followingsResolver,
} = require('../resolvers');

module.exports = {
    followers_count: async root => {
        return await Follow.count({ following: root._id });
    },
    followers: (root, args) => {
        return followersResolver({
            following: root._id,
            ...args,
        });
    },
    following_count: async root => {
        return await Follow.count({ follower: root._id });
    },
    following: (root, args) => {
        return followingResolver({
            follower: root._id,
            ...args,
        });
    },
    profile_image: root => fileResolver(root.profile_image),
    posts: async (root, { limit, page }, ctx) => {
        return await Post.find({ user: ctx.user })
            .limit(limit)
            .skip(page * limit);
    },
};
