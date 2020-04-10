const { withSession, check } = require('../../utils');
const { User } = require('../../models');

module.exports = withSession(async (root, { limit, page, _id, username }) => {
    const filter = {};

    // Check id
    if (_id) {
        await check.id(_id);
        filter._id = _id;
    }

    // Check username
    if (username) {
        await check.username(_id, true);
        filter.username = username;
    }

    return await User.find(filter)
        .limit(limit)
        .skip(limit * page);
});
