const socket = io();

socket.on('connect', () => {
    joinRoom();
});


socket.on('message', (data) => {

});

let sendMessage = (text, username, channel) => {
    socket.emit('message', { text, from: username, channel });
}

let joinRoom = (channel) => {
    socket.emit('join room', channel);
}