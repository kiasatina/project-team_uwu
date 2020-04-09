const { Livestream } = require('../models');
const { JOIN, LEAVE, PEER_RELAY } = require('./events');

module.exports = (socket, rooms) => {
    const { room, user } = socket;

    // Let people know joining
    socket.on(JOIN, () => {
        socket.to(room).emit(JOIN, {
            peer: socket.id,
            ...user,
        });
    });

    // Relay peer info
    socket.on(PEER_RELAY(), data => {
        const host = rooms[room].host;
        if (host) host.emit(PEER_RELAY(socket.id), data);
    });

    // On leave, broadcast and update count
    socket.on('disconnect', async () => {
        await Livestream.updateOne({ _id: room }, { $inc: { viewers: -1 } });
        socket.to(room).emit(LEAVE, {
            peer: socket.id,
            ...user,
        });
    });
};
