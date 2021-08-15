const path = require('path');
const fs = require('fs');

let threeRandomWords = (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '../public/words.txt'), 'utf8');
    const wordsArray = data.toString().split(',');
    let result = [];
    let randomNums = [];
    while(randomNums.length < 3) {
        let random = Math.floor(Math.random() * wordsArray.length);
        let findIfExists = randomNums.filter( num => num == random);
        if(findIfExists.length > 0) continue;
        randomNums.push(random);
        result.push(wordsArray[random]);
    }

    res.send(result);
}
module.exports = { threeRandomWords }