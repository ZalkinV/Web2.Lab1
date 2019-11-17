import { getWeather, extractForecast } from "./api";
import { displayWeather, displayError, updateTab } from "./display";


window.onload = () => {
    const form = document.getElementById("input-form");
    form.addEventListener("submit", onSubmit);
};

async function onSubmit(e) {
    e.preventDefault();

    const inputCityName = e.currentTarget.elements.input.value;
    try {
        const weatherResponse = await getWeather(inputCityName);
        const forecast = extractForecast(weatherResponse);
        displayWeather(forecast);
        updateTab("Weather in " + forecast.name, forecast.icon);
    } catch (error) {
        displayError(error.message);
    }
}
