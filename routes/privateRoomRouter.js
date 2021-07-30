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
    console.log(req.params.roomId);
    res.send(req.params.roomId);
});

module.exports = router;