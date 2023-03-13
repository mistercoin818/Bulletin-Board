const express = require("express");
// const path = require("path");

const app = express();
const port = 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', require('./routes/index'));
// app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, ()=>{
    console.log(`Started at port ${port}`);
});

module.exports = app;