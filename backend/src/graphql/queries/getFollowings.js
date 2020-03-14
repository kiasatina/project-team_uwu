const { followingsResolver } = require('../resolvers');
const { withSession } = require('../../utils');

module.exports = withSession((root, args) => followingsResolver(args));
