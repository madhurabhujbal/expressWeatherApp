const {getWeatherInfo, getTimeStamp} = require('./synchronousWeatherAPI');

let data = getWeatherInfo('Pune');
// let date = getTimeStamp();
console.log(data);
