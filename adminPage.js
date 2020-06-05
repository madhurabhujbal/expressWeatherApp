const {MongoClient} = require('mongodb');
const {getTimeStamp} = require('./synchronousWeatherAPI');


function deleteOldRecords(res) {
    let currentDate = getTimeStamp();
//establish connection to database
    (async function() {
        let url = 'mongodb://localhost:27017';
        let conn = await MongoClient.connect(url);
        let dbRef = conn.db('WeatherApp');
        let coll = dbRef.collection('weatherData');
        //delete old records
        let queryResult = await coll.deleteMany({"date": {$lt: currentDate}});
        //close connection
        conn.close();
        console.log(queryResult.deletedCount);
        res.render('adminPage', {recordNumber: queryResult.deletedCount});
    }());
}

module.exports = deleteOldRecords;