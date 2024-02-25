const createError=require('./error.js')
const axios = require('axios');
async function fetchWeather(city, country) {
    const apiKey = process.env.WEATHER;
    console.log(`this ${apiKey}`)
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    console.log(apiUrl)
    try {
        const response = await axios.get(apiUrl);
        console.log("Entered here")
        const weatherData = response.data;
        return weatherData;
    } catch (err) {
        console.log("In catch entered");
        return null;
    }
}
module.exports = {fetchWeather};