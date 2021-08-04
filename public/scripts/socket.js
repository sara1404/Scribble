const socket = io();
let label = document.getElementById('room-id');
let roomId = label.innerHTML;
let messageContext = document.getElementById('message-input');
let playerUsername = document.querySelector('#player-name label');
let messageBox = document.querySelector('.message-box');




messageContext.addEventListener('keypress', (e) => {
    if(e.key == 'Enter'){
        sendMessage(messageContext.value, playerUsername.innerHTML, roomId);
    }
});

socket.on('connect', () => {
    joinRoom(roomId);
});


socket.on('message', (data) => {
    appendMessage(data);
    messageContext.value = '';
    if(messageBox.scrollHeight == messageBox.clientHeight) return;
    messageBox.scrollTo(0, messageBox.scrollHeight);
});

let sendMessage = (text, username, channel) => {
    if(text.trim() == '') return;
    socket.emit('message', { text, from: username, channel });
}

let joinRoom = (channel) => {
    socket.emit('join room', channel);
}

let appendMessage = (message) => {
    let from = message.from;
    let text = message.text;
    let element = document.createElement('div');
    let messageOwner = document.createElement('label');
    let messageText = document.createElement('label');

    messageOwner.id = 'message-owner';
    messageText.className = 'message-text';
    element.className = 'message';
    messageOwner.innerHTML = from + ':';
    messageText.innerHTML = text;
    element.appendChild(messageOwner);
    element.appendChild(messageText);
    messageBox.appendChild(element);
}