const { Livestream } = require('../models');
const { JOIN, LEAVE, UPDATE_LAYER, PEER_RELAY } = require('./events');

module.exports = (socket, rooms) => {
    const { room, user } = socket;

    // Let people know joining
    socket.on(JOIN, () => {
        socket.to(room).emit(JOIN, {
            username: user.username,
            peer: socket.id,
            _id: user._id,
        });
    });

    // Relay peer info
    socket.on(PEER_RELAY(), data => {
        const host = rooms[room].host;
        if (host) host.emit(PEER_RELAY(socket.id), data);
    });

    // Relay layer updates
    socket.on(UPDATE_LAYER, data => {
        rooms[room].layers[socket.io] = data;
        socket.to(room).emit(UPDATE_LAYER, {
            peer: socket.id,
            data,
        });
    });

    // On leave, broadcast and update count
    socket.on('disconnect', async () => {
        socket.to(room).emit(LEAVE, {
            peer: socket.id,
            ...user,
        });

        // Close enough to nextTick, hence is good as is
        await Livestream.updateOne({ _id: room }, { $inc: { viewers: -1 } });
        if (rooms[room]) {
            delete rooms[room].sockets[socket.id];
            delete rooms[room].viewers[socket.id];
            delete rooms[room].layers[socket.id];
        }
    });
};
