const express = require('express');
const axios = require('axios');
const {MongoClient} = require('mongodb');
const {getWeatherInfo, getTimeStamp} = require('./synchronousWeatherAPI');
const deleteOldRecords = require('./adminPage');

const app = express();
app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');
app.set('view engine', 'pug');

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
    let weatherInformation = getWeatherInfo(cityName, res, currentDate);
});

app.get('/admin', (req, res) => {
    res.render('adminPage.ejs');
});

app.get('/admin/cleanup', (req, res) => {
    deleteOldRecords(res);
});


app.get('/index.pug', (req, res) => {
    res.render('index.pug');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});