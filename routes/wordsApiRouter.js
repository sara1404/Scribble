const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { threeRandomWords } = require('../controllers/wordsApiController');

router.get('/', threeRandomWords);

module.exports = router;