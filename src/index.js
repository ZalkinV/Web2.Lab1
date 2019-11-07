import { getWeather, extractForecast } from "./api";
import { displayWeather, displayError, updateTab } from "./display";


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
