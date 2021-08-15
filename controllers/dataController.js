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

let checkPlayer = (id, room) => {
    for(let i = 0; i < room.listOfPlayers.length; i++){
        if(room.listOfPlayers[i].id === id) return true;
    }
    return false;
}

let addNewPlayer = (link, id, username, img) => {
        
        console.log('Added new player ', id, username, img);
        
        let room = getRoomByLink(link);
        if(room == null) return;
        if(checkPlayer(id, room)) return;
        room.listOfPlayers.push({id, username, img});
}

let findIndexOf = (room, id) => {
    let i = 0;
    let players = room.listOfPlayers;
    while(i < players.length) {
        if(players[i].id == id) break;
        i++;
    } 
    return i;
}

let removePlayer = (link, id) => {
    let room = getRoomByLink(link);
    if(room == null) return;
    if(!checkPlayer(id, room)) return;
    room.listOfPlayers.splice(findIndexOf(room, id), 1);

} 

let getAllPlayers = (link) => {
    let room = getRoomByLink(link);
    if(room == null) return [];
    return room.listOfPlayers;
}

module.exports = { addRoomToArray, getRoomByLink, addNewPlayer, removePlayer, getAllPlayers }