

function deleteOldRecords() {
    if(weatherInfo.date != currentDate) {
        await collRef.deleteMany({"city" : cityName});
    }
}

module.exports = deleteOldRecords;