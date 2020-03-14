const { Image } = require('../../models');

module.exports = async file => {
    const image = await Image.findById(file);
    if (image) {
        image.src = `${process.env.BASENAME}/assets/${image.src}`;
    }
    return image;
};
