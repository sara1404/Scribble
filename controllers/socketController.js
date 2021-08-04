module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('join room', (roomId) => {
            socket.join(roomId);
        });
        socket.on('message', (msg) => {
            socket.emit(msg);
        });
    });
}