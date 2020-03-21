const validator = require('validator');
const { withSession, errors } = require('../../utils');
const { Livestream } = require('../../models');

module.exports = withSession(async (root, { title }, ctx) => {
    if (validator.isEmpty(title)) {
        throw new Error(errors.INVALID_ERROR('TITLE'));
    }

    if (await Livestream.exists({ user: ctx.user, live: true })) {
        throw new Error(errors.EXISTS_ERROR('LIVESTREAM'));
    }

    return await Livestream.create({ title, user: ctx.user });
});
