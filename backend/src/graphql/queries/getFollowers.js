const { followersResolver } = require('../resolvers');
const { withSession } = require('../../utils');

module.exports = withSession((root, args) => followersResolver(args));
