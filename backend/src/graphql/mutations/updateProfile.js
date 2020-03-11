const { withSession, check } = require('../../utils');
const { User, Image } = require('../../models');

//{ username, password, bio, profile_image }
module.exports = withSession(async (root, { input }, ctx) => {
    const { profile_image, ...args } = input;
    const user = await User.findById(ctx.user, 'profile_image');

    if (args.username !== undefined) {
        await check.username(args.username, true);
    }

    if (args.password !== undefined) {
        await check.password(args.password);
    }

    if (profile_image) {
        if (user.profile_image) {
            await Image.replace(user.profile_image, profile_image);
        } else {
            const { _id } = await Image.upload(profile_image);
            args.profile_image = _id;
        }

        // Deleting image
    } else if (profile_image === null && user.profile_image) {
        await Image.remove(user.profile_image);
        args.profile_image = null;
    }

    return await User.findByIdAndUpdate({ _id: ctx.user }, args, { new: true });
});
