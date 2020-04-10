const { User } = require('../../models');

module.exports = {
    user: async root => {
        return await User.findById(root.user);
    },
};
