const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/245be2b378283b0e68dc5cb2e0ffd8c3/'+latitude+','+longitude+'?units=si'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Location service', undefined)
        } else if (body.error) {
            callback('Unable to find location, Try another search', undefined)  
        } else {
            callback(undefined, body.daily.data[0].summary + "It is "+body.currently.temperature+ " out there and "+body.currently.precipProbability+"% chance of rain.")
        }
    })
}

module.exports = forecast