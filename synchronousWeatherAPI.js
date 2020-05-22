const axios = require('axios');
const {MongoClient} = require('mongodb');

let cityName = 'Manchester';

//establish connection
MongoClient.connect('mongodb://localhost:27017', function(err, conn) {
    if (err) throw err;
    //connect to database
    dbRef = conn.db('WeatherApp');
    collRef = dbRef.collection('weatherData');
    collRef.findOne({"city" : cityName}, function(err, result) {
        if(err) throw err;
        if(result != null) {
            console.log("Retrieving data from database : ");
            console.log(result);
        } else {
            (async function () {
                console.log("Retrieving data from website : ");
                result = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=manchester&appid=446cc30bc37be1228e1d55b09335aeb6');
                console.log(result);
            }());
        }
    });
    //close connection
    conn.close();
});
