"use strict"


var data = { title: "My New Post", body: "This is my first post!" };
displayWeather(data);

function displayWeather(weatherParams)
{
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    
    var html = template(weatherParams);
    document.body.innerHTML += html;
}
