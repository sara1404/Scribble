let { addRoomToArray, getRoomByLink } = require('./dataController');




const postOpenRoom = (req, res) => {
    let { link } = req.body;
    if(getRoomByLink(link) !== null) {
        return res.status(401).send({ex: 'Generated link alredy exists'});
    }

    addRoomToArray(req.body);
    res.status(200).send({});
}



module.exports = { postOpenRoom }