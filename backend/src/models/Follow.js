const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
});

schema.index({ follower: 1, following: 1 }, { unique: true });

module.exports = mongoose.model('Follow', schema);
