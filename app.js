const express = require('express');
const axios = require('axios');
const {MongoClient} = require('mongodb');

const app = express();
app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    //res.render('index');
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});