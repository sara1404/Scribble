const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

//Routers 
const indexRouter = require('./routes/indexRouter');

app.set('view engine', 'pug');
app.set('views', './public/views');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.listen(PORT, (req, res) => {
    console.log('listening');
});