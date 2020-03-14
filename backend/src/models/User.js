const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        bio: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },
        validated: {
            type: Boolean,
            default: false,
        },
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
        profile_image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', schema);
