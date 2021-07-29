const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile('skribl.html', { root:path.join(__dirname, '/public/html/') });
});



app.listen(PORT, (req, res) => {
    console.log('listening');
});