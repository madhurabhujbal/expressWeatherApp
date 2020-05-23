const axios = require('axios');
const {MongoClient} = require('mongodb');


function getTimeStamp() {
    return "20200523";
}

function getWeatherInfo(cityName) {
    let weatherInfo = null;
    //establish connection
    (async function () {
        let conn = await MongoClient.connect('mongodb://localhost:27017');
        //connect to database
        dbRef = conn.db('WeatherApp');
        collRef = dbRef.collection('weatherData');
        weatherInfo = await collRef.findOne({"city" : cityName});
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
        return weatherInfo.data;
    }());
}

module.exports = getWeatherInfo;