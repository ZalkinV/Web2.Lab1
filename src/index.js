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
    
        const cityName = forecast.name;
        const iconCode = weatherResponse.weather[0].icon;
        const imgHref = "https://openweathermap.org/img/wn/" + iconCode + ".png";
        updateTab("Weather in " + cityName, imgHref);
    } catch (error) {
        displayError(error.message);
    }
}
