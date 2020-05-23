const axios = require('axios');
const {MongoClient} = require('mongodb');

let cityName = 'Manchester';

//establish connection
(async function () {
    let conn = await MongoClient.connect('mongodb://localhost:27017');
    //connect to database
    dbRef = conn.db('WeatherApp');
    collRef = dbRef.collection('weatherData');
    let weatherInfo = await collRef.findOne({"city" : cityName});
    if(weatherInfo != null) {
        console.log("Retrieving data from database : ");
        console.log(weatherInfo);
    } else {
            console.log("Retrieving data from website : ");
            weatherInfo = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=manchester&appid=446cc30bc37be1228e1d55b09335aeb6');
            console.log(weatherInfo.data);
            collRef.insertOne({"city" : cityName}, function(err, res) {
                if (err) throw err;
                console.log('Weather info inserted');
            });
        }
    //close connection
    conn.close();
}());
