const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    encoding: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Image', schema);
