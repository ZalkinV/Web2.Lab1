"use strict"

var source = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);

var data = { title: "My New Post", body: "This is my first post!" };
var html = template(data);

document.body.innerHTML = html;
