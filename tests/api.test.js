import { assert } from "chai";

import { extractForecast } from "../src/api";


describe("API", function() {
    describe("extractForecast", function() {
        const JSON = {
            "coord": {
                "lon": 120.99,
                "lat": 14.64
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 30,
                "pressure": 1007,
                "humidity": 74,
                "temp_min": 30,
                "temp_max": 30
            },
            "visibility": 10000,
            "wind": {
                "speed": 2.1,
                "deg": 120
            },
            "clouds": {
                "all": 75
            },
            "dt": 1573201270,
            "sys": {
                "type": 1,
                "id": 8160,
                "country": "PH",
                "sunrise": 1573163627,
                "sunset": 1573205143
            },
            "timezone": 28800,
            "id": 1692193,
            "name": "123",
            "cod": 200
        };

        it("forecast should contain property cityName", function() {
          const forecast = extractForecast(JSON);

          assert.property(forecast, "cityName");
        });
    });
});
