const {MongoClient} = require('mongodb');
const {getTimeStamp} = require('./synchronousWeatherAPI');


function deleteOldRecords(res) {
    let currentDate = getTimeStamp();
    let queryResult;
//establish connection to database
    (async function() {
        let url = 'mongodb://localhost:27017';
        let conn = await MongoClient.connect(url);
        try {
            let dbRef = conn.db('WeatherApp');
            let coll = dbRef.collection('weatherData');
            //delete old records
            queryResult = await coll.deleteMany({"date": {$lt: currentDate}});
        } catch (err) {
            console.log(err);
        }
        //close connection
        conn.close();
        let recordNumber = "" + queryResult.deletedCount;
        res.render('adminPage.ejs', {recordNumber});
    }());
}

module.exports = deleteOldRecords;