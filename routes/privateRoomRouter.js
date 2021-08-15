const express = require('express');
const router = express.Router();
const path = require('path');
const shortId = require('shortid');


router.get('/', (req, res) => {
    let roomLink = shortId.generate();
    res.render('privateRoom.pug', { roomLink })
});

router.get('/:roomId', (req, res) => { res.render('enterName.pug'); });
router.get('/:roomId/canvas', (req, res) => { res.render('canvas.pug', { buttonText: 'READY', roomId: req.params.roomId }); });
router.get('/admin/:roomId', (req, res) => { res.render('canvas.pug', { buttonText: 'START', roomId: req.params.roomId }); });



module.exports = router;