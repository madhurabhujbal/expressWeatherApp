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

function getDayOfWeek() {
    let today= new Date();
    const daysOfWeek = ['Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[today.getDay()]
}

function getTempInCentigrade(tempInKelvin) {
    let tempInCentigrade = ("" + (tempInKelvin - 273.15)).slice(0,5) + "°C";
    return tempInCentigrade;
}

function getWeatherInfo(view, cityName, res, currentDate) {
    let weatherInfo = null;
    //establish connection
    (async function () {
        let conn = await MongoClient.connect('mongodb://localhost:27017');
        try {
            //connect to database
            dbRef = conn.db('WeatherApp');
            collRef = dbRef.collection('weatherData');
            weatherInfo = await collRef.findOne({"city" : cityName, "date": currentDate});
            if(weatherInfo != null) {
                console.log("Retrieving data from database : ");
            } else {
                console.log("Retrieving data from website : ");
                weatherInfo = await axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=446cc30bc37be1228e1d55b09335aeb6");
                let result = await collRef.insertOne({"city" : cityName, date: getTimeStamp(), "data" : weatherInfo.data});
            }
        }
        catch(err) {
            console.log(err);
            // could not retrieve from web
            res.render('index', {errMsg : "could not retrieve from web"});
        }
        //close connection
        conn.close();
        console.log(cityName + " : " + weatherInfo.data.main.temp);
        console.log(weatherInfo.data);
        //res.render('weatherPage.ejs', {city : cityName, date : currentDate, weatherData : getTempInCentigrade(weatherInfo.data.main.temp)});
        res.render(view, {city : cityName, country : weatherInfo.data.sys.country, date : currentDate,
                          today : getDayOfWeek(), weatherData : getTempInCentigrade(weatherInfo.data.main.temp),
                          humidity : weatherInfo.data.main.humidity, wind : weatherInfo.data.wind.speed});
    }());
    //
}

module.exports = {getWeatherInfo, getTimeStamp};