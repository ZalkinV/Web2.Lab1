import weatherTemplate from "handlebars-loader!../templates/weather.hbs";
import errorTemplate from "handlebars-loader!../templates/error.hbs";

const WEATHER_DIV = document.getElementById("weather-container");
const ERROR_DIV = document.getElementById("error-container");


export function displayWeather(weather) {
    const weatherHtml = weatherTemplate(weather);

    ERROR_DIV.innerHTML = "";
    WEATHER_DIV.innerHTML = weatherHtml;
}

export function displayError(message) {
    const errorHtml = errorTemplate({ message });

    ERROR_DIV.innerHTML = errorHtml;
    WEATHER_DIV.innerHTML = "";
}

export function updateTab(newTitle, newImage) {
    document.title = newTitle;
    document.getElementById("favicon").href = newImage;
}
