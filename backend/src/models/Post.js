const mongoose = require('mongoose');

const Sticker = new mongoose.Schema({
    href: {
        type: String,
        required() {
            return !this.asset;
        },
    },
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required() {
            return !this.href;
        },
    },
});

const Position = new mongoose.Schema({
    x: {
        type: Number,
    },
    y: {
        type: Number,
    },
});

const schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        asset: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Image',
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        draft: {
            type: Boolean,
            default: true,
        },
        location: {
            lat: {
                type: Number,
            },
            long: {
                type: Number,
            },
            place: {
                type: String,
            },
        },
        audio: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
        },
        layers: [
            {
                type: {
                    type: String,
                    enum: ['FILTER', 'TEXT', 'STICKER'],
                    required: true,
                },
                filter: {
                    type: String,
                    required() {
                        return this.type === 'FILTER';
                    },
                },
                sticker: {
                    type: Sticker,
                    required() {
                        return this.type === 'STICKER';
                    },
                },
                position: {
                    type: Position,
                    required() {
                        return this.type !== 'FILTER';
                    },
                },
                text: {
                    type: String,
                    required() {
                        return this.type === 'TEXT';
                    },
                },
            },
        ],
    },
    { timestamps: true },
);

schema.index({ user: 1 });

module.exports = mongoose.model('Post', schema);
