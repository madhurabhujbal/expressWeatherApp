const app = require('../app');
const {getWeatherInfo, getTimeStamp} = require('../synchronousWeatherAPI');
const assert = require('chai').assert;

describe('When no city is entered and submit button is clicked', function() {
    it('Should give an error msg', function() {
        let result = getWeatherInfo();
        assert.equal(result, "Please enter a city");
    });
});