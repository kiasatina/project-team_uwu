const { Follow } = require('../../models');

module.exports = ({ following, limit, page }) => {
    return new Promise(resolve => {
        Follow.aggregate([
            { $match: { following } },
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
};
