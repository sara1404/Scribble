const express = require('express');
const router = express.Router();
const path = require('path');
const shortId = require('shortid');

router.get('/', (req, res) => {
    let username = req.query.username;
    if(username == undefined || username == null) 
        username = 'Generic';
    console.log(shortId.generate());
    res.render('privateRoom.pug', { username })
});


router.get('/:roomId', (req, res) => {

    //let base = 'http://localhost:3000/privroom/' + req.params.roomId;
    //res.render('linkRoom.pug', { roomId: base});
    res.sendFile('canvas.html', { root: path.join(__dirname, '../public/html')});
});

module.exports = router;