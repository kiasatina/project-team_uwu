const { fileResolver } = require('../resolvers');

module.exports = {
    asset: root => fileResolver(root.asset),
};
