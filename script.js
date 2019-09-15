"use strict"


function buttonClick() {
    let cityName = document.getElementById("input").value;

    let request = new XMLHttpRequest();
    request.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=7825ce4ffa896c5019e53087c858568a");
    request.responseType = "json";
    request.onload = function () {
        if (request.status == 200)
        {
            let data = extractData(request.response);
            displayWeather(data);
        }
        else
        {
            alert(request.response.message);
        }
    }
    request.send();
}


function displayWeather(data) {
    var source = document.getElementById("weather-template").innerHTML;
    var template = Handlebars.compile(source);

    var html = template(data);
    document.getElementById("weather-container").innerHTML = html;
}

function extractData(response) {
   let data =
   {
       "name" : response.name,
       "parameters" :
       [
           {"name" : "Temperature", "value" : response.main.temp},
           {"name" : "Pressure", "value" : response.main.pressure},
           {"name" : "Humidity", "value" : response.main.humidity},
           {"name" : "Clouds, %", "value" : response.clouds.all},
           {"name" : "Wind speed", "value" : response.wind.speed},
       ],
   };

   return data;
}
