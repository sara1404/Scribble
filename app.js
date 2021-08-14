const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const PORT = process.env.PORT || 3000;

//Routers 
const indexRouter = require('./routes/indexRouter');
const privateRoomRouter = require('./routes/privateRoomRouter');
const wordsRouter = require('./routes/wordsApiRouter');
const openRoomRouter = require('./routes/openRoomRouter');
//Activate socket listener
require('./controllers/socketController')(io);

app.set('view engine', 'pug');
app.set('views', './public/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
//Routes in use

app.use('/', indexRouter);
app.use('/openroom', openRoomRouter);
app.use('/privroom', privateRoomRouter);
app.use('/api/words', wordsRouter);


server.listen(PORT, (req, res) => {
    console.log('listening at ', PORT);
});