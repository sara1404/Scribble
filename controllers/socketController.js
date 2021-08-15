module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('join room', (roomId) => {
            socket.join(roomId);
            console.log(roomId);
        });
        socket.on('message', (msg) => {
            io.in(msg.channel).emit('message', msg);
        });

        socket.on('new drawing', (info) => {
            socket.to(info.roomId).emit('new drawing', info);
        });

        socket.on('new player', (data) => {
            io.in(data.roomId).emit('new player', { img: data.img, username: data.username });
        });

        socket.on('fill', (data) => {
            socket.to(data.roomId).emit('fill', data);
        });

        socket.on('disconnecting', (reason) => {
            const iterator = socket.rooms.values();
            iterator.next();
            const room = iterator.next().value;
            socket.to(room).emit('user disconnected', socket.id, room);
        });
    

    });
}