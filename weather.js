const axios = require('axios');
const {MongoClient} = require('mongodb');

let currentDate = new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth();
let year = currentDate.getUTCFullYear();
let timestamp = day + '' + ('0' + (month + 1)) + '' + year;
let city = 'London';
let weatherInfo;

function getOnlineInfo() {
    //1. Fetch data from weather site
    return axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02');
}

//Establish connection to database
const url = 'mongodb://localhost:27017';
(async function connectDb() {
    let conn;
    try {
        conn = await MongoClient.connect(url, {useUnifiedTopology: true});
        const db = conn.db('WeatherApp');
        const collection = db.collection('weatherData');
        const result = await collection.findOne({"city" : city, "date" : timestamp});

        if(result){
            console.log('Retrieving from database');
            weatherInfo = result.data;
        } else{
            console.log('Retrieving from web');
            let response = await getOnlineInfo();
            weatherInfo = response.data;
        }
        console.log(weatherInfo);
    } catch (error) {
        console.log('Error: ' + error);
    }
    //Close connection
    conn.close();
}());
