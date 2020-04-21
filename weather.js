const axios = require('axios');
const {MongoClient} = require('mongodb');

let currentDate = new Date();
console.log(currentDate);
let day = currentDate.getDate();
let month = currentDate.getMonth();
let year = currentDate.getUTCFullYear();
let date = day + '' + ('0' + (month + 1)) + '' + year;
console.log(date);
let city = 'London';

//Establish connection to database
const url = 'mongodb://localhost:27017';
(async function connectDb() {
    let conn;
    try {
        conn = await MongoClient.connect(url, {useUnifiedTopology: true});
        const db = conn.db('WeatherApp');
        const collection = db.collection('weatherData');
        const result = await collection.findOne();
        console.log(result);
    } catch (error) {
       console.log('Error: ' + error);
    }

    //Close connection
    conn.close();
    }());

function getOnlineInfo() {
    //1. Fetch data from weather site
    axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02')
    .then((response) => {

        //2. Display fetched data on console
        return response.data;
    })
    .catch((error) => {
        console.log('error : ' + error);
    });

}

    //Retrieve data from database


