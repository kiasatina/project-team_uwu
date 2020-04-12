const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const { Follow } = require('../../models');

module.exports = ({ following, limit, page }) => {
    return new Promise(resolve => {
        Follow.aggregate([
            { $match: { following: ObjectId(following) } },
            { $skip: page * limit },
            { $limit: limit },
            {
                $lookup: {
                    from: 'users',
                    localField: 'follower',
                    foreignField: '_id',
                    as: 'follower',
                },
            },
        ]).exec((err, [result = {}]) => {
            resolve(result.follower || []);
        });
    });
};
