const socket = io();
let label = document.getElementById('room-id');
let roomId = label.innerHTML;
let messageContext = document.getElementById('message-input');
let playerUsername = document.querySelector('#player-name label');
let messageBox = document.querySelector('.message-box');

let picture = document.getElementById('profile-pic');
let profilePic = picture.querySelector('img');

let listOfPlayers = document.querySelector('.list-of-players');

let sendMessage = (text, username, channel) => {
    if(text.trim() == '') return;
    socket.emit('message', { text, from: username, channel });
}

let joinRoom = (channel) => {
    socket.emit('join room', channel);
}

let emitNewPlayer = () => {
    console.log('this is source', profilePic.currentSrc);
    socket.emit('new player', { roomId, username: localStorage.getItem('username'), img: localStorage.getItem('img')});
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


function addNewPlayer(img, name, id){
    let element = document.createElement('div');
    element.id = id;
    let playerPic = document.createElement('img');
    let playerName = document.createElement('label');
    let points = document.createElement('label');
    element.className = 'player';
    playerPic.src = img;
    playerName.innerHTML = name;
    points.innerHTML = '0';
    element.appendChild(playerPic);
    element.appendChild(playerName);
    element.appendChild(points);
    listOfPlayers.appendChild(element);
}

function removePlayer(id){
    console.log('id is', id);
    let node = document.getElementById(id);
    let listOfPlayers = document.querySelector('.list-of-players')
    console.log(node);
    listOfPlayers.removeChild(node);
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
   addNewPlayer(data.img, data.username, data.id);
});

socket.on('clear canvas', () => {
    clearCanvas(true);
})

socket.on('fill', ({ x, y, startColor, endColor }) => {
    fillBucket(x, y, startColor, endColor, true);
})

socket.on('user disconnected', (socketId, roomId) => {
    console.log('user disconnected', socketId);
    removePlayer(socketId);
}); 

socket.on('all players', (players) => {
    console.log(players);
    players.forEach(player => addNewPlayer(player.img, player.username, player.id));
});