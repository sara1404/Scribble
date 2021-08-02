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
//Activate socket listener
require('./controllers/socketController')(io);

app.set('view engine', 'pug');
app.set('views', './public/views');
app.use(express.static(path.join(__dirname, 'public')));

//Routes in use
app.use('/', indexRouter);
app.use('/privroom', privateRoomRouter);

server.listen(PORT, (req, res) => {
    console.log('listening');
});