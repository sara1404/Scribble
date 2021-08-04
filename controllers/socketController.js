module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('join room', (roomId) => {
            socket.join(roomId);
        });
        socket.on('message', (msg) => {
            io.in(msg.channel).emit('message', msg);
        });
    });
}