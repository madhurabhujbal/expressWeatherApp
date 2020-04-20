const axios = require('axios');
const {MongoClient} = require('mongodb');

//1. Fetch data from weather site
axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02').then((response) => {

//2. Display fetched data on console
    console.log(response.data);
})
.catch((error) => {
    console.log('error : ' + error);
});

//Establish connection to database
const url = 'mongodb://localhost:27017';
const dbName = 'WeatherApp';
(async function connectDb() {
    let conn;
    try {
        conn = await MongoClient.connect(url);
        const db = conn.db(dbName);
        const collection = db.collection('weatherData');
        const result = await collection.findOne({'city' : 'London'});
        console.log('London Weather : ' + result);

    } catch (error) {
        console.log('Error: ' + error);
    }

    //Close connection
    conn.close();
});

//Retrieve data from database



