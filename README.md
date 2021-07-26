# Automation suite for OpenWeather API  
This framework is aimed at automating a happy path to take user's inputs and check if the forecast matches user's expectations.

## Installing dependencies
In the root directory (openweathermap-forecast) run:
```bash
# strictly install only what's in package-lock
npm ci
```
## Running the test scenarios
### Run all scenarios
```bash
APP_ID=api-key-here CITYNAME=Sydney DAY=Thursday npm run test 
```
- APP_ID - API KEY which is required to make the request
- CITYNAME - City for which forecast is required
- DAY - Weekday name
- run the test and generate HTML report in `report.html`

### Reports cleanup
To delete the report run
```bash
npm run clean:report
```
## Tools and Technology
- JavaScript
- Mocha
- Chai
## Note
The test is generic and covers any user inputs given the city and day are valid city name and weekday name respectively.
If tempertaure in the city is warmer than what the user wants on the day of user's choice, test passes.
If it's colder than the test fails. 
## References
- https://openweathermap.org/current\
is hit to fetch latitude and longitude for the given city which are then fed into the next API call

- https://openweathermap.org/api/one-call-api
takes retrieved latitude and longitude and returns forecast for next 7 days.