const mongoose = require('mongoose');
const mime = require('mime-types');
const { v4 } = require('uuid');
const fs = require('fs');

const PATH = src => `${process.env.STATIC}/${src}`;

const write = (stream, src) => {
    return new Promise(resolve => {
        const writeStream = fs.createWriteStream(PATH(src));
        writeStream.on('finish', resolve);
        stream().pipe(writeStream);
    });
};

const schema = new mongoose.Schema({
    src: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

schema.statics.upload = async function(file) {
    // Create store file with random name
    const { mimetype, createReadStream } = await file;
    const src = `${v4()}.${mime.extension(mimetype)}`;
    await write(createReadStream, src);

    // Create doc and return it
    const res = await this.create({
        type: mimetype,
        src,
    });
    return res;
};

schema.statics.reupload = async function(_id, file) {
    // Remove old file
    const old = await this.findById(_id, 'src');
    try {
        await fs.promises.unlink(PATH(old.src));
    } catch (err) {
        console.warn(err.message);
    }

    // Update with new file
    const { createReadStream, mimetype } = await file;
    const src = `${v4()}.${mime.extension(mimetype)}`;
    await write(createReadStream, src);
    await this.updateOne({ _id }, { src, type: mimetype });
};

schema.statics.remove = async function(_id) {
    const old = await this.findById(_id, 'src');
    try {
        await fs.promises.unlink(PATH(old.src));
    } catch (err) {
        console.warn(err.message);
    }

    await this.deleteOne({ _id });
};

module.exports = mongoose.model('Image', schema);
