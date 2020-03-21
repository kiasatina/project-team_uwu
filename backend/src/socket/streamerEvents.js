const events = require('./events');

module.exports = (socket, rooms) => {
    const { room, user } = socket;
    socket.in(room).on('join', () => {
        socket.to(socket.id).emit(INIT_STREAM, rooms.viewers);
    });
};
