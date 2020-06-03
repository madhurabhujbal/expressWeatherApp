const express = require('express');
const axios = require('axios');
const {MongoClient} = require('mongodb');
const {getWeatherInfo, getTimeStamp} = require('./synchronousWeatherAPI');

const app = express();
app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {errMsg : ''});
});

app.get('/weather', (req, res) => {
    let cityName = req.query.City;
    let err = "Please enter a city";
    if(cityName.length == 0) {
        res.render('index', {errMsg : err});
        return;
    }

    let currentDate = getTimeStamp();
    let weatherInformation = getWeatherInfo(cityName, res, currentDate);

//     (async function weather() {
//         let conn = await MongoClient.connect('mongodb://localhost:27017');
//         //connect to database
//         dbRef = conn.db('WeatherApp');
//         collRef = dbRef.collection('weatherData');
//         weatherInfo = await collRef.findOne({"city" : cityName});
//         if(weatherInfo != null) {
//             console.log("Retrieving data from database : ");
//         } else {
//             console.log("Retrieving data from website : ");
//             weatherInfo = await axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=446cc30bc37be1228e1d55b09335aeb6");
//             let result = await collRef.insertOne({"city" : cityName, date: getTimeStamp(), "data" : weatherInfo.data});
//         }
//         //close connection
//         conn.close();
//         console.log("temperature : ");
//         console.log(weatherInfo.data.main.temp);
//         res.render('weatherPage', {city : cityName, date : currentDate, weatherData : weatherInfo.data.main.temp});
//     }());
 });

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});