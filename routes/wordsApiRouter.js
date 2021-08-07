const { Console } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '../public/words.txt'), 'utf8');
    const wordsArray = data.toString().split(',');
    let result = [];
    for(let i = 0; i < 3; i ++) {
        let random = Math.floor(Math.random() * wordsArray.length);
        result.push(wordsArray[random]);
    }

    res.send(result);
});

module.exports = router;