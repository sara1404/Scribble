const socket = io();
let label = document.getElementById('room-id');
let roomId = label.innerHTML;
let messageContext = document.getElementById('message-input');
let playerUsername = document.querySelector('#player-name label');
let messageBox = document.querySelector('.message-box');




let sendMessage = (text, username, channel) => {
    if(text.trim() == '') return;
    socket.emit('message', { text, from: username, channel });
}

let joinRoom = (channel) => {
    socket.emit('join room', channel);
}

let emitNewPlayer = () => {
    //OVDJE TREBA DA SE IZVUCE SRC OD NASLOVNE SLIKE I DA SE PROSLIJEDI SVIM OSTALIM IGRACIMA
    socket.emit('new player', { roomId, username: playerUsername.innerHTML, img: ''})
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


messageContext.addEventListener('keypress', (e) => {
    if(e.key == 'Enter') {
        sendMessage(messageContext.value, playerUsername.innerHTML, roomId);
    }
});

socket.on('connect', () => {
    joinRoom(roomId);
    emitNewPlayer(roomId);
});


socket.on('message', (data) => {
    appendMessage(data);
    messageContext.value = '';
    if(messageBox.scrollHeight == messageBox.clientHeight) return;
    messageBox.scrollTo(0, messageBox.scrollHeight);
});

socket.on('new drawing', (info) => { drawStreamedContent(info) });

socket.on('new player', (data) => {
   //OVDJE TREBA DA SE POZOVE FUNKCIJA KOJA CE UBACIVATI NOVE IGRACE
});
