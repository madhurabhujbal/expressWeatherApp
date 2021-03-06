const express = require('express');
const axios = require('axios');
const path = require('path');
const {MongoClient} = require('mongodb');

const {getWeatherInfo, getTimeStamp, getDayOfWeek} = require('./synchronousWeatherAPI');
const deleteOldRecords = require('./adminPage');
const { Console } = require('console');

const app = express();
app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/weather', (req, res) => {
    let cityName = req.query.City;
    let err = "Please enter a city";
    if(cityName.length == 0) {
        res.render('index.ejs', {errMsg : err});
        return;
    }
    let currentDate = getTimeStamp();
    let weatherInformation = getWeatherInfo('weatherPage.ejs', cityName, res, currentDate);
});

app.get('/admin', (req, res) => {
    res.render('adminPage.ejs');
});

app.get('/admin/cleanup', (req, res) => {
    deleteOldRecords(res);
});

app.get('/pug', (req, res) => {
    res.render('index.pug');
});

app.get('/weatherPage', (req, res) => {
    let cityName = req.query.City;
    let currentDate = getTimeStamp();
    let weatherInformation = getWeatherInfo('weatherPage.pug', cityName, res, currentDate);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
