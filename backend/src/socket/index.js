const socketIo = require('socket.io');
const http = require('http');

const streamerEvents = require('./streamerEvents');
const authentication = require('./auth');
const rooms = {};

module.exports = app => {
    const server = http.createServer(app);
    const io = socketIo(server);

    // Do auth
    authentication(io);

    // Handle connection
    io.on('connection', socket => {
        const { room, streamer } = socket;

        // Initialize room as needed
        if (!rooms[room])
            rooms[room] = {
                host: undefined,
                viewers: [],
                layers: {},
            };

        // Populate fields
        if (streamer) {
            rooms[room].host = socket.id;
        } else {
            rooms[room].layers[socket.id] = {};
            rooms[room].viewers.add(socket.id);
        }

        // Load in handlers
        const events = streamer ? streamerEvents : watcherEvents;
        events(socket, rooms);

        // Join room
        socket.join(room);
    });

    return new Promise((resolve, reject) => {
        server.listen(process.env.SOCKET, err => {
            if (err) reject(err);
            resolve();
        });
    });
};
