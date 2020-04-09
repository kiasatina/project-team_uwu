const { END_STREAM, START_PEER, PEER_RELAY } = require('./events');
const { Livestream } = require('../models');

module.exports = (socket, rooms) => {
    const { room } = socket;

    // Relay peer info
    socket.on(PEER_RELAY(), ({ data, peer }) => {
        const to = rooms[room].viewers[peer];
        if (to) to.emit(PEER_RELAY(), data);
    });

    // Start peer connection
    socket.on(START_PEER, peer => {
        const _socket = rooms[room].viewers[peer];
        if (_socket) _socket.emit(START_PEER);
    });

    socket.on('disconnect', async () => {
        await Livestream.updateOne({ _id: room }, { $set: { live: false } });
        socket.to(room).emit(END_STREAM);
    });
};
