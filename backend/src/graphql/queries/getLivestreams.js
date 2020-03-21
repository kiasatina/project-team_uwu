const { withSession } = require('../../utils');
const { Livestream } = require('../../models');

module.exports = withSession(async (root, { limit, page, ...filters }) => {
    return await Livestream.find(
        Object.assign(
            filters,
            filters.updatedAt !== undefined && {
                updatedAt: { $gte: filters.updatedAt },
            },
        ),
    )
        .limit(limit)
        .skip(limit * page);
});
