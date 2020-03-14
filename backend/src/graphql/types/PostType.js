const { User } = require('../../models');
const { fileResolver } = require('../resolvers');

module.exports = {
    user: async root => {
        return await User.findById(root.user);
    },
    asset: root => fileResolver(root.asset),
    audio: root => fileResolver(root.audio),
};
