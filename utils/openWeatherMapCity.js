"use strict";

// Set variables
var appId = process.env.APP_ID;
var cityNameQuery = process.env.CITYNAME;
var holiday = process.env.DAY;
var temperature = process.env.TEMPERATURE

var units = "metric";
const url = "https://api.openweathermap.org/data/2.5"

exports.cityNameQuery=cityNameQuery
exports.holiday=holiday
exports.temperature=temperature

var request = require('supertest');

//GET By city name 
exports.getCityInfo = async function () {
    const response = await request(url)
        .get('/weather')
        .query({ appId, q: cityNameQuery });
    return response.body.coord
};

exports.getForecastWeather = async function ({ lat, lon }) {
    const response = await request(url)
        .get('/onecall')
        .query({ lat, lon, units, appId, exclude: 'hourly,minutely' });
    return response
};

exports.getDayValue = (day) => {
    switch (day) {
        case 'Sunday':
            return 0
        case 'Monday':
            return 1
        case 'Tuesday':
            return 2
        case 'Wednesday':
            return 3
        case 'Thursday':
            return 4
        case 'Friday':
            return 5
        case 'Saturday':
            return 6
        default:
            return -1
    }
};