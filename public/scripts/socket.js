const socket = io();

socket.on('connect', () => {
    console.log("We just connected");
});