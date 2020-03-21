const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        live: {
            type: Boolean,
            default: true,
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

// Remove after 1 hour of no more streaming
schema.index(
    { updatedAt: 1 },
    {
        expires: 6400,
        partialFilterExpression: { live: false },
    },
);

module.exports = mongoose.model('Livestream', schema);
