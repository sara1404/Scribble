const express = require('express');
const router = express.Router();
const { postOpenRoom } = require('../controllers/openRoomController');


router.post('/', postOpenRoom);


module.exports = router;
