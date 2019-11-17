const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_BASE_PARAMETERS = "&appid=7825ce4ffa896c5019e53087c858568a&units=metric&lang=en";

const WEATHER_ICON_URL = "https://openweathermap.org/img/wn";

const ICON_SIZE = 64;
const PARAMETERS_ICONS_URL = `https://img.icons8.com/color/${ICON_SIZE}`;


export async function getWeather(cityName) {
    const url = `${API_BASE_URL}?q=${cityName}${API_BASE_PARAMETERS}`;
    
    const weatherResponse = await fetch(url);
    const weatherJSON = await weatherResponse.json();
    if (!weatherResponse.ok)
        throw Error(weatherJSON.message);

    return weatherJSON;
}

export function extractForecast(apiResponse) {
    const {
        name: cityName,
        weather: [{ icon: iconCode, description }],
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
    } = apiResponse;
    
    let forecast =
    {
        cityName: cityName,
        description: description,
        icon: `${WEATHER_ICON_URL}/${iconCode}.png`,
        parameters:
            [
                {
                    name: "Temperature",
                    value: temperature,
                    units: "&deg;C",
                    icon : `${PARAMETERS_ICONS_URL}/thermometer.png`
                },
                {
                    name: "Pressure",
                    value: pressure,
                    units: "hPa",
                    icon : `${PARAMETERS_ICONS_URL}/barometer-gauge.png`
                },
                {
                    name: "Humidity",
                    value: humidity,
                    units: "%",
                    icon : `${PARAMETERS_ICONS_URL}/hygrometer.png`
                },
                {
                    name: "Clouds",
                    value: clouds,
                    units: "%",
                    icon : `${PARAMETERS_ICONS_URL}/clouds.png`
                },
                {
                    name: "Wind speed",
                    value: windSpeed,
                    units: "m/s",
                    icon : `${PARAMETERS_ICONS_URL}/wind.png`
                },
            ],
    };

    return forecast;
}
