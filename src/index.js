import getWeather from "./api";
import weatherTemplate from "handlebars-loader!../templates/weather.hbs";
import errorTemplate from "handlebars-loader!../templates/error.hbs";


const WEATHER_DIV = document.getElementById("weather-container");
const ERROR_DIV = document.getElementById("error-container");


window.onload = () => {
    const form = document.getElementById("input-form");
    form.addEventListener("submit", onSubmit);
};

function onSubmit(e) {
    e.preventDefault();

    const inputCityName = e.currentTarget.elements.input.value;
    getWeather(inputCityName)
        .then(response => {
            response.json()
            .then(json => {
                if (response.ok) {
                    const forecast = extractForecast(json);
                    displayWeather(forecast);

                    const cityName = json.name;
                    const imgHref = "https://openweathermap.org/img/wn/" + json.weather[0].icon + ".png";
                    updateTab("Weather in " + cityName, imgHref);
                } else {
                    displayError(json.message);
                }
            });
        },
        error => displayError(error));
}


function displayWeather(weather) {
    const weatherHtml = weatherTemplate(weather);

    ERROR_DIV.innerHTML = "";
    WEATHER_DIV.innerHTML = weatherHtml;
}

function displayError(message) {
    const errorHtml = errorTemplate({ message });

    ERROR_DIV.innerHTML = errorHtml;
    WEATHER_DIV.innerHTML = "";
}

function updateTab(newTitle, newImage) {
    document.title = newTitle;
    document.getElementById("favicon").href = newImage;
}

function extractForecast(response) {
    const ICON_SIZE = 64;

    const {
        name: cityName,
        main:
        {
            temp: temperature,
            pressure,
            humidity,
        } = {},
        clouds:
        {
            all: clouds,
        } = {},
        wind:
        {
            speed: windSpeed,
        } = {},
    } = response;
    
    let forecast =
    {
        cityName: cityName,
        description: response.weather[0].description,
        parameters:
            [
                {
                    name: "Temperature",
                    value: temperature,
                    units: "&deg;C",
                    icon : "https://img.icons8.com/color/" + ICON_SIZE + "/000000/thermometer.png"
                },
                {
                    name: "Pressure",
                    value: pressure,
                    units: "hPa",
                    icon : "https://img.icons8.com/color/" + ICON_SIZE + "/000000/barometer-gauge.png"
                },
                {
                    name: "Humidity",
                    value: humidity,
                    units: "%",
                    icon : "https://img.icons8.com/color/" + ICON_SIZE + "/000000/hygrometer.png"
                },
                {
                    name: "Clouds",
                    value: clouds,
                    units: "%",
                    icon : "https://img.icons8.com/color/" + ICON_SIZE + "/000000/clouds.png"
                },
                {
                    name: "Wind speed",
                    value: windSpeed,
                    units: "m/s",
                    icon : "https://img.icons8.com/color/" + ICON_SIZE + "/000000/wind.png"
                },
            ],
    };

    return forecast;
}
