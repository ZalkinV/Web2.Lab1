"use strict"


function buttonClick()
{
    let cityName = document.getElementById("input").value;

    let request = new XMLHttpRequest();
    request.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=7825ce4ffa896c5019e53087c858568a");
    request.responseType = "json";
    request.onload = function()
    {
        if (request.status == 200)
            displayWeather(request.response)
        else
            document.body.innerHTML += request.statusText;
    }
    request.send();
}


function displayWeather(weatherParams)
{
    var source = document.getElementById("weather-template").innerHTML;
    var template = Handlebars.compile(source);
    
    var html = template(weatherParams);
    document.getElementById("weather-container").innerHTML = html;
}
