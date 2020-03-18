const { withSession, check } = require('../../utils');
const { User, Image } = require('../../models');

//{ username, password, bio, profile_image }
module.exports = withSession(
    async (
        root,
        { profile_image, username, password, new_password, bio },
        ctx,
    ) => {
        let args = {};
        const user = await User.findById(ctx.user, 'profile_image');

        if (username !== undefined) {
            await check.username(username, true);
            args.username = username;
        }

        if (new_password !== undefined) {
            await check.password(password, user);
            await check.password(new_password);
            args.password = new_password;
        }

        if (bio !== undefined) {
            args.bio = bio;
        }

        if (profile_image) {
            await check.file(profile_image, 'image');
            if (user.profile_image) {
                await Image.reupload(user.profile_image, profile_image);
            } else {
                const { _id } = await Image.upload(profile_image);
                args.profile_image = _id;
            }
        } else if (profile_image === null && user.profile_image) {
            await Image.remove(user.profile_image);
            args.profile_image = null;
        }

        return await User.findByIdAndUpdate({ _id: ctx.user }, args, {
            new: true,
        });
    },
);
