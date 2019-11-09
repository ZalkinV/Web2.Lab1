const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_BASE_PARAMETERS = "&appid=7825ce4ffa896c5019e53087c858568a&units=metric&lang=en";

export function getWeather(cityName) {
    const url = `${API_BASE_URL}?q=${cityName}${API_BASE_PARAMETERS}`;
    return fetch(url);
}

export function extractForecast(json) {
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
    } = json;
    
    let forecast =
    {
        cityName: cityName,
        description: json.weather[0].description,
        parameters:
            [
                {
                    name: "Temperature",
                    value: temperature,
                    units: "&deg;C",
                    icon : `https://img.icons8.com/color/${ICON_SIZE}/000000/thermometer.png`
                },
                {
                    name: "Pressure",
                    value: pressure,
                    units: "hPa",
                    icon : `https://img.icons8.com/color/${ICON_SIZE}/000000/barometer-gauge.png`
                },
                {
                    name: "Humidity",
                    value: humidity,
                    units: "%",
                    icon : `https://img.icons8.com/color/${ICON_SIZE}/000000/hygrometer.png`
                },
                {
                    name: "Clouds",
                    value: clouds,
                    units: "%",
                    icon : `https://img.icons8.com/color/${ICON_SIZE}/000000/clouds.png`
                },
                {
                    name: "Wind speed",
                    value: windSpeed,
                    units: "m/s",
                    icon : `https://img.icons8.com/color/${ICON_SIZE}/000000/wind.png`
                },
            ],
    };

    return forecast;
}
