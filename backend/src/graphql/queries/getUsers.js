const { withSession } = require('../../utils');
const { User } = require('../../models');

module.exports = withSession(async (root, { limit, page, ...filter }) => {
    return await User.find(filter)
        .limit(limit)
        .skip(limit * page);
});
