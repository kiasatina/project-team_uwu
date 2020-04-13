const { Post, Image } = require('../../models');
const { withSession } = require('../../utils');

module.exports = withSession(async (root, args, ctx) => {
    const post = await Post.findById({ _id: args._id });
    if (!post) {
        throw new Error(errors.EXISTS_ERROR('POST'));
    }

    if (args.sticker) {
        if (args.sticker.href) {
            if (post.sticker.asset) {
                await Image.remove(post.sticker.asset);
            }
        } else if (args.sticker.asset) {
            if (post.sticker.asset) {
                await Image.reupload(post.sticker.asset, args.sticker.asset);
                delete args.sticker.asset;
            } else {
                args.sticker.asset = await Image.upload(args.sticker.asset);
            }
        }
    }

    return await Post.findByIdAndUpdate({ _id: args._id }, args, {
        new: true,
    });
});
