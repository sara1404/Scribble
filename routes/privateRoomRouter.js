const express = require('express');
const router = express.Router();
const path = require('path');
const shortId = require('shortid');

router.get('/', (req, res) => {
    let username = req.query.username;
    if(username == undefined || username == null) 
        username = 'Generic';
    let roomLink = shortId.generate();
    res.render('privateRoom.pug', { roomLink })
});

router.get('/:roomId', (req, res) => { res.render('enterName.pug'); });
router.get('/:roomId/canvas', (req, res) => { res.render('canvas.pug'); });
router.get('/admin/:roomId', (req, res) => {console.log('hit'); res.render('canvas.pug'); });


module.exports = router;