
'use strict'

var weathermap = require('../utils/openWeatherMapCity.js');
var schema = require('../utils/baseCheck.js');

var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var done = chai.done;
var Validator = require('jsonschema').Validator;

/**
 * provides checks for the Happy scenario
 *  - Place is a valid place
 *  - Temperature is greater than what the user wants
 *  - Day is a valid week day Sunday, Monday etc.
 */
describe("Happy holidaymaker", async function () {
    let cityCoords
    let responseForecast
    let dayIndex

    before(async () => {
        cityCoords = await weathermap.getCityInfo()
        if(!cityCoords)
            throw new Error("Invalid City")
    });

    context('wants to holiday in ' + weathermap.cityNameQuery, async function () {
        it("checks " + weathermap.cityNameQuery + " is valid city", async function () {
            expect(cityCoords.lat,"Latitude null").to.be.not.null
            expect(cityCoords.lon,"Longitude null").to.be.not.null
            responseForecast = await weathermap.getForecastWeather({ lat: cityCoords.lat, lon: cityCoords.lon })
        });
    })

    context('likes to holiday only on ' + weathermap.holiday, async function () {
        it("checks the forecast for coming " + weathermap.holiday, async function () {

            for (var i = 0; i < responseForecast.body.daily.length; i++) {
                var day = new Date(responseForecast.body.daily[i].dt * 1000)
                if (weathermap.getDayValue(weathermap.holiday) == day.getDay()) {
                    dayIndex = i
                    return
                }
            }
            assert(false, "Invalid Day")
        });
    })

    context('look up weather forecast', async function () {
        it("checks forecast received", async function () {
            expect(responseForecast.status).to.eq(200)
        });

        it("checks valid JSON received", async function () {
            var v = new Validator();
            var res = v.validate(responseForecast.body, schema.weatherSchema)
            expect(res.valid, "Weather API response schema validation").to.be.true
        });
    })

    context('If temperature is >' + weathermap.temperature + ' degrees C', async function () {
        it("checks for temperature", async function () {
            expect(responseForecast.body.daily[dayIndex].temp.day, "Temperature for " + weathermap.holiday).to.be.greaterThan(parseInt(weathermap.temperature))
        });
    })
});