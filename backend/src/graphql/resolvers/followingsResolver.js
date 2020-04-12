const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { Follow } = require('../../models');

module.exports = ({ follower, limit, page }) => {
    return new Promise(resolve => {
        Follow.aggregate([
            { $match: { follower: ObjectId(follower) } },
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
};
