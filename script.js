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
            let imgHref = "https://openweathermap.org/img/wn/" + request.response.weather[0].icon + ".png";
            updateTab("Weather in " + cityName, imgHref);
            
            let data = extractForecast(request.response);
            displayWeather(data);
        }
        else {
            displayError(request.response.message);
        }
    }

    request.send();
}


function displayWeather(forecast) {
    let source = document.getElementById("weather-template").innerHTML;
    let template = Handlebars.compile(source);

    let html = template(forecast);
    document.getElementById("error-container").innerHTML = "";
    document.getElementById("weather-container").innerHTML = html;
}

function displayError(message) {
    let source = document.getElementById("error-template").innerHTML;
    let template = Handlebars.compile(source);

    let context =
    {
        message : message
    };
    let html = template(context);

    document.getElementById("error-container").innerHTML = html;
    document.getElementById("weather-container").innerHTML = "";
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
