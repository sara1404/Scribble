let roomArray = [];

let addRoomToArray = (room) => {
    let listOfPlayers = [];
    let updatedRoom = { ...room, listOfPlayers };
    roomArray.push(updatedRoom);
}

let getRoomByLink = (link) => {
    let array = roomArray.filter(room =>  room.link === link);
    return array.length > 0 ? array[0] : null;
}

let checkPlayer = (link, id, room) => {
    for(let i = 0; i < room.listOfPlayers.length; i++){
        if(room.listOfPlayers[i] === id) return true;
    }
    return false;
}

let addNewPlayer = (link, id) => {
        let room = getRoomByLink(link);
        if(room == null) return;
        if(checkPlayer(link, id, room)) return;
        room.listOfPlayers.push(id);
}

let removePlayer = (link, id) => {
    let room = getRoomByLink(link);
    if(room == null) return;
    if(!checkPlayer(link, id, room)) return;
    room.listOfPlayers.splice(room.listOfPlayers.indexOf(id), 1)
} 

module.exports = { addRoomToArray, getRoomByLink, addNewPlayer, removePlayer }