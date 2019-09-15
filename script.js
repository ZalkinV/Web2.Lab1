"use strict"


function buttonClick() {
    let cityName = document.getElementById("input").value;

    let request = new XMLHttpRequest();

    let requestText = "https://api.openweathermap.org/data/2.5/weather" +
        "?q=" + cityName +
        "&appid=7825ce4ffa896c5019e53087c858568a" +
        "&units=metric";
    request.open("GET", requestText);
    request.responseType = "json";

    request.onload = function () {
        if (request.status == 200) {
            let data = extractForecast(request.response);
            displayWeather(data);
        }
        else {
            alert(request.response.message);
        }
    }
    request.send();
}


function displayWeather(forecast) {
    var source = document.getElementById("weather-template").innerHTML;
    var template = Handlebars.compile(source);

    var html = template(forecast);
    document.getElementById("weather-container").innerHTML = html;
}

function extractForecast(response) {
    let forecast =
    {
        "city_name": response.name,
        "main": response.weather[0].description,
        "parameters":
            [
                { "name": "Temperature", "value": response.main.temp, "units": "&deg;C" },
                { "name": "Pressure", "value": response.main.pressure, "units": "hPa" },
                { "name": "Humidity", "value": response.main.humidity, "units": "%" },
                { "name": "Clouds", "value": response.clouds.all, "units": "%" },
                { "name": "Wind speed", "value": response.wind.speed, "units": "m/s" },
            ],
    };

    return forecast;
}
