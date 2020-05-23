const {getWeatherInfo, getTimeStamp} = require('./synchronousWeatherAPI');

//let data = getWeatherInfo('Mumbai');
let date = getTimeStamp();
console.log(date);