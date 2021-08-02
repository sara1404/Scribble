const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

//Routers 
const indexRouter = require('./routes/indexRouter');
const privateRoomRouter = require('./routes/privateRoomRouter');
app.set('view engine', 'pug');
app.set('views', './public/views');
app.use(express.static(path.join(__dirname, 'public')));

//Routes in use
app.use('/', indexRouter);
app.use('/privroom', privateRoomRouter);

app.listen(PORT, (req, res) => {
    console.log('listening on port ', PORT);
});