const { Follow, Image } = require('../../models');

module.exports = {
    followers_count: async root => {
        return await Follow.count({ following: root._id });
    },
    followers: (root, { limit, page }) => {
        return new Promise(resolve => {
            Follow.aggregate([
                { $match: { following: root._id } },
                { $skip: page * limit },
                { $limit: limit },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'follower',
                        foreignField: '_id',
                        as: 'followers',
                    },
                },
            ]).exec((err, [result = {}]) => {
                resolve(result.followers || []);
            });
        });
    },
    following_count: async root => {
        return await Follow.count({ follower: root._id });
    },
    following: (root, { limit, page }) => {
        return new Promise(resolve => {
            Follow.aggregate([
                { $match: { follower: root._id } },
                { $skip: page * limit },
                { $limit: limit },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'following',
                        foreignField: '_id',
                        as: 'following',
                    },
                },
            ]).exec((err, [result = {}]) => {
                resolve(result.following || []);
            });
        });
    },
    profile_image: async root => {
        return await Image.findById(root.profile_image);
    },
};
