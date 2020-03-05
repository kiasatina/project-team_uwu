const { createWriteStream } = require('fs');
const path = require('path');

module.exports = async (root, { file }) => {
    const { createReadStream, filename, mimetype, encoding } = await file;
    createReadStream().pipe(
        createWriteStream(path.join(process.env.STATIC, filename)),
    );

    return { filename, mimetype, encoding };
};
