const axios = require('axios');
const {MongoClient} = require('mongodb');

function getTimeStamp() {
    let currentDate = new Date();
    let date = ('0' + currentDate.getDate()).slice(-2);
    let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    let year = '' + currentDate.getFullYear();

    let timeStamp = year + '/' + month + '/' + date;
    return timeStamp;
}

function getTempInCentigrade(tempInKelvin) {
    let tempInCentigrade = ("" + (tempInKelvin - 273.15)).slice(0,5) + "°C";
    return tempInCentigrade;
}

function getWeatherInfo(cityName, res, currentDate) {
    let weatherInfo = null;
    //establish connection
    (async function () {
        let conn = await MongoClient.connect('mongodb://localhost:27017');
        //connect to database
        dbRef = conn.db('WeatherApp');
        collRef = dbRef.collection('weatherData');
        weatherInfo = await collRef.findOne({"city" : cityName, "date": currentDate});
        // if(weatherInfo.date != currentDate) {
        //     await collRef.deleteMany({"city" : cityName});
        // }
        if(weatherInfo != null) {
            console.log("Retrieving data from database : ");
        } else {
                console.log("Retrieving data from website : ");
                weatherInfo = await axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=446cc30bc37be1228e1d55b09335aeb6");
                let result = await collRef.insertOne({"city" : cityName, date: getTimeStamp(), "data" : weatherInfo.data});
            }
        //close connection
        conn.close();
        console.log(weatherInfo.data);
        res.render('weatherPage', {city : cityName, date : currentDate, weatherData : getTempInCentigrade(weatherInfo.data.main.temp)});
    }());
    //
}

module.exports = {getWeatherInfo, getTimeStamp};