const axios = require('axios');

//1. Fetch data from weather site
axios.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02').then((response) => {
    console.log(response.data);
})
.catch((error) => {
    console.log('error : ' + error);
});

//2. Display fetched data on console
