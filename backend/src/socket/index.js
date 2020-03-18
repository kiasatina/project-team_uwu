const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const http = require('http');

const { errors } = require('../utils');

module.exports = app => {
    const server = http.createServer(app);
    const io = socketIo(server);

    // Do auth
    io.use(({ handshake }, next) => {
        try {
            const { _id } = jwt.verify(
                handshake.query.token,
                process.env.SECRET,
            );

            if (handshake.query.room) {
                socket.room = handshake.query.room;
                socket.user = _id;
                return next();
            }
        } catch {
            // Nothing to see here
        }

        next(new Error(errors.AUTHENTICATION_ERROR));
    });

    io.on('connection', socket => {
        const config = {
            streaming: false,
            room: '',
        };

        socket.on('stream', data => {
            socket.broadcast.emit('stream', data);
        });
    });

    return new Promise((resolve, reject) => {
        server.listen(process.env.SOCKET, err => {
            if (err) reject(err);
            resolve();
        });
    });
};
