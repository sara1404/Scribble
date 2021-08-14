let rooms = [];

const findIfExists = (link) => {
    let roomsWithLink = rooms.filter(room => room.link == link);
    console.log(roomsWithLink.length);
    return roomsWithLink.length > 0;
}

const postOpenRoom = (req, res) => {
    let { link } = req.body;
    if(findIfExists(link)) {
        return res.status(401).send({ex: 'Generated link alredy exists'});
    }

    rooms.push(req.body);
    res.status(200).send({});
}



module.exports = { postOpenRoom }