const {getWeatherInfo, getTimeStamp} = require('./synchronousWeatherAPI');

let data = getWeatherInfo('Jaipur');
// let date = getTimeStamp();
console.log(data);
