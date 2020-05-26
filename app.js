const express = require('express');
const axios = require('axios');
const {MongoClient} = require('mongodb');
const {getWeatherInfo} = require('./synchronousWeatherAPI');

const app = express();
app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let city = req.query.City;
    let weather = getWeatherInfo(city);
    res.render('index', {weatherInfo : weather});
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});