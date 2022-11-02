const request = require('postman-request');

const forecast = (latitude, longtitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e916a9fe06c31953e92c6f8df7686c47&query=${longtitude},${latitude}`;

    request(url, { json: true, }, (error, { body, } = {}) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            const { temperature, feelslike, weather_descriptions, humidity, } = body.current;
            const message = `${weather_descriptions[0]}. It's currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The humidity is ${humidity}%`;
            callback(null, message);
        }
    });
};

module.exports = forecast;
