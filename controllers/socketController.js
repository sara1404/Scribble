const { addNewPlayer, getAllPlayers, removePlayer } = require('./dataController');

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('join room', (roomId) => {
            socket.join(roomId);
        });
        socket.on('message', (msg) => {
            io.in(msg.channel).emit('message', msg);
        });

        socket.on('new drawing', (info) => {
            socket.to(info.roomId).emit('new drawing', info);
        });

        socket.on('new player', (data) => {
            addNewPlayer(data.roomId, socket.id, data.username, data.img);
            socket.in(data.roomId).emit('new player', { id: socket.id, img: data.img, username: data.username });
            io.to(socket.id).emit('all players', getAllPlayers(data.roomId));

        });

        socket.on('fill', (data) => {
            socket.to(data.roomId).emit('fill', data);
        });

        socket.on('clear canvas', roomId => {
            io.to(roomId).emit('clear canvas');
        })

        socket.on('disconnecting', (reason) => {

            const iterator = socket.rooms.values();
            iterator.next();
            const room = iterator.next().value;
            socket.leave(room);
            removePlayer(room, socket.id);
            socket.to(room).emit('user disconnected', socket.id, room);

        });
    

    });
}