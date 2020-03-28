const request = require('request');

//Just in case we don't destructure undefined, which may crash our server, we use an empy object as the default param, which can be destructured.
const forecast = ({latitude, longitude, location} = {}, callback) => {
    const url = `https://api.darksky.net/forecast/ee338582964b43163f1feeffb8b2ab61/${latitude},${longitude}?units=si&lang=en`;

    request({url, json: true}, (error, response) => {
        if(error) {
            callback('Could not connect to weather services', undefined);
        } else if(response.body.error) {
            callback('Invalid location', undefined);
        } else {
            const forecast = {
                summary: response.body.daily.data[0].summary,
                temperature: 'It is currently ' + response.body.currently.temperature + ' degree Celcius out.',
                temperatureLow: 'Lowest temperature of the day: ' + response.body.daily.data[0].temperatureLow,
                temperatureHigh: 'Highest temperature of the day: ' + response.body.daily.data[0].temperatureHigh,
                chancesOfRain: 'There is a ' + response.body.currently.precipProbability*100 + '% chance of rain',
                location
            }
            callback(undefined, forecast);
        }
    }) 
}

// You can also destructure the response object into its body label

module.exports = forecast;