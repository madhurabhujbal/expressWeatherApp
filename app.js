const express = require('express');
const axios = require('axios');
const {MongoClient} = require('mongodb');
const {getWeatherInfo} = require('./synchronousWeatherAPI');

const app = express();
app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/weather', (req, res) => {
    let city = req.query.City;
    console.log(city);
    res.send(city);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});