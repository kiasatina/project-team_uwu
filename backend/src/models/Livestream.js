const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        viewers: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

schema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('Livestream', schema);
