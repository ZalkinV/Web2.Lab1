import weatherTemplate from "handlebars-loader!../templates/weather.hbs";

const WEATHER_DIV = document.getElementById("weather-container");


export function displayWeather(weather) {
    const weatherHtml = weatherTemplate(weather);

    WEATHER_DIV.innerHTML = weatherHtml;
}

export function updateTab(newTitle, newImage) {
    document.title = newTitle;
    document.getElementById("favicon").href = newImage;
}
