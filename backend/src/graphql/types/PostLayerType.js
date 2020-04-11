const { fileResolver } = require('../resolvers');

module.exports = {
    sticker: {
        asset: root => fileResolver(root.asset),
    },
};
