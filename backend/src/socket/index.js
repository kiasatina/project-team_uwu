const socketIo = require('socket.io');
const http = require('http');

const streamerEvents = require('./streamerEvents');
const ViewerEvents = require('./ViewerEvents');
const authentication = require('./auth');
const { GET_ROLE } = require('./events');
const rooms = {};

module.exports = app => {
    const server = http.createServer(app);
    const io = socketIo(server);

    // Do auth
    authentication(io);

    // Handle connection
    io.on('connection', socket => {
        const { room, streamer } = socket;
        socket.join(room);

        // Initialize room as needed
        if (!rooms[room]) {
            rooms[room] = {
                host: undefined,
                viewers: {},
                layers: {},
            };
        }

        // Populate fields
        if (streamer) {
            rooms[room].host = socket;
        } else {
            rooms[room].viewers[socket.id] = socket;
            rooms[room].layers[socket.id] = {};
        }

        socket.on(GET_ROLE, ack => {
            ack(socket.streamer ? 'STREAMER' : 'VIEWER');
        });

        // Load in handlers
        const handlers = streamer ? streamerEvents : ViewerEvents;
        handlers(socket, rooms);
    });

    return new Promise((resolve, reject) => {
        server.listen(process.env.SOCKET, err => {
            if (err) reject(err);
            resolve();
        });
    });
};
