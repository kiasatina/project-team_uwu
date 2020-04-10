const jwt = require('jsonwebtoken');
const { Livestream } = require('../models');
const { errors } = require('../utils');

module.exports = io => {
    io.use(async (socket, next) => {
        // If missing any, bad authorization
        const { token, room } = socket.handshake.query;
        if (!token) {
            return next(new Error(errors.MISSING_ERROR('TOKEN')));
        }

        if (!room) {
            return next(new Error(errors.MISSING_ERROR('ROOM')));
        }

        // Check if stream exists
        if (!(await Livestream.exists({ _id: room, live: true }))) {
            return next(new Error(errors.INVALID_ERROR('ROOM')));
        }

        try {
            // Check token
            socket.user = jwt.verify(token, process.env.SECRET);

            // Find stream
            const stream = await Livestream.findOne(
                { user: socket.user._id, live: true },
                '_id',
            );

            // Store info
            socket.streamer = stream && room === stream._id.toString();
            socket.room = room;

            // Update viewer count
            if (!socket.streamer) {
                await Livestream.updateOne(
                    { _id: room },
                    { $inc: { viewers: 1 } },
                );
            }
            next();
        } catch (err) {
            next(new Error(errors.AUTHENTICATION_ERROR));
            console.log(err);
        }
    });
};
