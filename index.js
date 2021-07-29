const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './public/views');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile('skribl.html', { root:path.join(__dirname, '/public/html/') });
});

app.get('/ljubav', (req, res) => {
    res.render('index.pug');
})



app.listen(PORT, (req, res) => {
    console.log('listening');
});