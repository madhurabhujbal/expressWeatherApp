const axios = require('axios');
const {MongoClient} = require('mongodb');

//establish connection
MongoClient.connect('mongodb://localhost:27017', function(err, conn) {
    if (err) throw err;
    dbRef = conn.db('WeatherApp');
    collRef = dbRef.collection('weatherData');
    conn.close();
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