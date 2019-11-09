import { assert } from "chai";

import { extractForecast } from "../src/api";


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

        it("json shoud be parsed to forecast", function() {
            const ICON_SIZE = 64;
            let expectedForecast = {
                cityName: JSON.name,
                description: JSON.weather[0].description,
                parameters: [
                    {
                        value: JSON.main.temp,
                        name: "Temperature",
                        units: "&deg;C",
                        icon : `https://img.icons8.com/color/${ICON_SIZE}/000000/thermometer.png`
                    },
                    {
                        value: JSON.main.pressure,
                        name: "Pressure",
                        units: "hPa",
                        icon : `https://img.icons8.com/color/${ICON_SIZE}/000000/barometer-gauge.png`
                    },
                    {
                        value: JSON.main.humidity,
                        name: "Humidity",
                        units: "%",
                        icon : `https://img.icons8.com/color/${ICON_SIZE}/000000/hygrometer.png`
                    },
                    {
                        value: JSON.clouds.all,
                        name: "Clouds",
                        units: "%",
                        icon : `https://img.icons8.com/color/${ICON_SIZE}/000000/clouds.png`
                    },
                    {
                        value: JSON.wind.speed,
                        name: "Wind speed",
                        units: "m/s",
                        icon : `https://img.icons8.com/color/${ICON_SIZE}/000000/wind.png`,
                    },
                ]
            };

            const actualForecast = extractForecast(JSON);

            assert.deepEqual(actualForecast, expectedForecast);
        });
    });
});
