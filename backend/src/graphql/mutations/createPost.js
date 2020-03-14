const { Post, Image } = require('../../models');
const { withSession, check } = require('../../utils');

module.exports = withSession(
    async (root, { asset, title, description }, ctx) => {
        await check.file(asset, 'video');
        const upload = await Image.upload(asset, ctx.user);
        const res = await Post.create({
            asset: upload._id,
            user: ctx.user,
            description,
            title,
        });

        return res;
    },
);
