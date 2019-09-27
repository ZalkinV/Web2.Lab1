"use strict"


function buttonClick() {
    let cityName = document.getElementById("input").value;

    let request = new XMLHttpRequest();

    let requestText = "https://api.openweathermap.org/data/2.5/weather" +
        "?q=" + cityName +
        "&appid=7825ce4ffa896c5019e53087c858568a" +
        "&units=metric" +
        "&lang=en";
    request.open("GET", requestText);
    request.responseType = "json";

    request.onload = function () {
        if (request.status == 200) {
            let cityName = request.response.name;
            let imgHref = "http://openweathermap.org/img/wn/" + request.response.weather[0].icon + ".png";
            updateTab("Weather in " + cityName, imgHref);
            
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

function updateTab(newTitle, newImage) {
    document.title = newTitle;
    document.getElementById("favicon").href = newImage;
}

function extractForecast(response) {
    const ICON_SIZE = 64;
    let forecast =
    {
        cityName: response.name,
        main: response.weather[0].description,
        parameters:
            [
                {
                    name: "Temperature",
                    value: response.main.temp,
                    units: "&deg;C",
                    icon : "https://img.icons8.com/color/" + ICON_SIZE + "/000000/thermometer.png"
                },
                {
                    name: "Pressure",
                    value: response.main.pressure,
                    units: "hPa",
                    icon : "https://img.icons8.com/color/" + ICON_SIZE + "/000000/barometer-gauge.png"
                },
                {
                    name: "Humidity",
                    value: response.main.humidity,
                    units: "%",
                    icon : "https://img.icons8.com/color/" + ICON_SIZE + "/000000/hygrometer.png"
                },
                {
                    name: "Clouds",
                    value: response.clouds.all,
                    units: "%",
                    icon : "https://img.icons8.com/color/" + ICON_SIZE + "/000000/clouds.png"
                },
                {
                    name: "Wind speed",
                    value: response.wind.speed,
                    units: "m/s",
                    icon : "https://img.icons8.com/color/" + ICON_SIZE + "/000000/wind.png"
                },
            ],
    };

    return forecast;
}
