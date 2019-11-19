import { assert } from "chai";
import sinon from "sinon";

import { extractForecast, getWeather } from "../src/api";


describe("api", function() {
    
    describe("extractForecast", function() {
        
        const JSON = {
            "coord": {
                "lon": 44.68,
                "lat": 43.02
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 8.93,
                "pressure": 1023,
                "humidity": 66,
                "temp_min": 8.89,
                "temp_max": 9
            },
            "visibility": 10000,
            "wind": {
                "speed": 4,
                "deg": 100
            },
            "clouds": {
                "all": 20
            },
            "dt": 1573312299,
            "sys": {
                "type": 1,
                "id": 8969,
                "country": "RU",
                "sunrise": 1573271122,
                "sunset": 1573307090
            },
            "timezone": 10800,
            "id": 473249,
            "name": "Vladikavkaz",
            "cod": 200
        };


        it("forecast should contains property 'cityName'", function() {
            const forecast = extractForecast(JSON);

            assert.property(forecast, "cityName");
            assert.isString(forecast.cityName, "cityName type");
        });

        it("forecast should contains property 'description'", function() {
            const forecast = extractForecast(JSON);

            assert.property(forecast, "description");
            assert.isString(forecast.description, "description type");
        });

        it("forecast should contains property 'icon'", function() {
            const forecast = extractForecast(JSON);

            assert.property(forecast, "icon");
            assert.isString(forecast.icon, "icon type");
        });

        it("forecast should contains array 'parameters'", function() {
            const forecast = extractForecast(JSON);

            assert.property(forecast, "parameters");
            assert.isArray(forecast.parameters);
        });

        it("forecast's array 'parameters' should contain 5 elements", function() {
            let parametersLength = 5;

            const forecast = extractForecast(JSON);

            assert.isArray(forecast.parameters);
            assert.lengthOf(forecast.parameters, parametersLength);
        });

        it("each forecast's parameter should contains fields: 'name', 'value', 'units', 'icon'", function() {
            const forecast = extractForecast(JSON);
            
            forecast.parameters.forEach(parameter => {
                assert.property(parameter, "name");
                assert.property(parameter, "value");
                assert.property(parameter, "units");
                assert.property(parameter, "icon");
            });
        });

        it("each forecast's parameter 'icon' propety should be the link to icon at https://img.icons8.com", function() {
            const forecast = extractForecast(JSON);

            forecast.parameters.forEach(parameter => {
                assert.match(parameter.icon, /^http(s|):\/\/img\.icons8\.com/)
            });
        });

        it("json shoud be parsed to forecast", function() {
            const ICON_SIZE = 64;
            const ICON_URL = `https://img.icons8.com/color/${ICON_SIZE}`;
            
            let expectedForecast = {
                cityName: JSON.name,
                description: JSON.weather[0].description,
                icon: "https://openweathermap.org/img/wn/02n.png",
                parameters: [
                    {
                        value: JSON.main.temp,
                        name: "Temperature",
                        units: "&deg;C",
                        icon : `${ICON_URL}/thermometer.png`
                    },
                    {
                        value: JSON.main.pressure,
                        name: "Pressure",
                        units: "hPa",
                        icon : `${ICON_URL}/barometer-gauge.png`
                    },
                    {
                        value: JSON.main.humidity,
                        name: "Humidity",
                        units: "%",
                        icon : `${ICON_URL}/hygrometer.png`
                    },
                    {
                        value: JSON.clouds.all,
                        name: "Clouds",
                        units: "%",
                        icon : `${ICON_URL}/clouds.png`
                    },
                    {
                        value: JSON.wind.speed,
                        name: "Wind speed",
                        units: "m/s",
                        icon : `${ICON_URL}/wind.png`,
                    },
                ]
            };

            const actualForecast = extractForecast(JSON);

            assert.deepEqual(actualForecast, expectedForecast);
        });

    });


    describe("getWeather", () => {

        before(() => {
            global.fetch = () => null;
        });
        
        after(() => {
            delete global.fetch;
        });

        let stubbedFetch;
        beforeEach(() => {
            stubbedFetch = sinon.stub(global, "fetch");
            stubbedFetch
                .resolves({
                    ok: true,
                    json: () => Promise.resolve("default json content")
                });
        });

        afterEach(() => {
            stubbedFetch.restore();
        });

        it("should call fetch once", async () => {
            await getWeather("cityName");

            assert.equal(stubbedFetch.callCount, 1);
        });
        
        it("should call fetch and return resolved promise", async () => {
            const expectedJsonContent = "faked json data";
            stubbedFetch
                .resolves({
                    ok: true,
                    json: () => Promise.resolve(expectedJsonContent)
                });

            const response = await getWeather("cityName");
            
            assert.equal(expectedJsonContent, response);
        });

    });

});
