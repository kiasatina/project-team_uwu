const { rainbow } = require('chalk-animation');
const socketIo = require('socket.io');
const http = require('http');

module.exports = app => {
    const server = http.createServer(app);
    const io = socketIo(server);

    io.on('connection', socket => {
        console.log('a user connected');
        console.log(socket);
    });

    return new Promise((resolve, reject) => {
        server.listen(process.env.SOCKET, err => {
            if (err) reject(err);
            resolve();
        });
    });
};
