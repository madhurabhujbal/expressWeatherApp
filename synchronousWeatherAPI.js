const axios = require('axios');
const {MongoClient} = require('mongodb');

//create database
const url = 'mongodb://localhost:27017';
const db = db('WeatherApp');
const collection = db.collection('weatherData');

//establish connection
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log('database created');
    db.close();
});
//connect to database
//close connection

// function getWeather(cityName){
//     let city = cityName;
//     //if()
// };

// function getTodayTime() {

// };

// function getInfoOnline() {
//     return axios.get('http://api.openweathermap.org/data/2.5/weather?q=manchester&appid=446cc30bc37be1228e1d55b09335aeb6');

// };