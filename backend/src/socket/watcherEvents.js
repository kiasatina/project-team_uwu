const { Livestream } = require('../models');
const events = require('./events');

module.exports = socket => {
    const { room, user } = socket;
    socket.to(room).emit(events.NEW_VIEWER, {
        username: user.username,
        peerId: socket.id,
    });

    // On leave, broadcast and update count
    socket.on('disconnect', () => {
        socket.to(room).emit('leave', user.username);
        Livestream.updateOne({ _id: room }, { $inc: { viewers: -1 } });
    });
};
