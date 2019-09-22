# Task
Сверстать страницу, содержащую поле ввода и кнопку для поиска информации о погоде в заданном городе. По нажатию на кнопку происходит вызов внешнего API погоды (например, https://openweathermap.org/api). Получаемые данные (не менее 5 элементов) отрисовываются на этой же странице.

Для отрисовки полученных данных должен использоваться один из клиентских шаблонизаторов (например, https://proglib.io/p/templating-languages-and-engines/). Для визуального оформления страницы используется CSS препроцессор (SASS, LESS, Stylus).

Работа делается в публичном github-репозитории. Все необходимые инструкции для локального запуска проекта должны быть описаны в README.md в корне проекта.

# How to...
## Run project
To open this page locally you just need to open _index.html_ file in browser and have the Internet connection so that the weather information from [OpenWatherMap](https://openweathermap.org/api) can be received. 

## Change styles
1. [Install SASS](https://sass-lang.com/install)
2. Modify one of .scss files with any text editor
3. Run command in console:  
`sass <input_file_name.scss> <output_file_name.css>`  

If you use VS Code, as I do, you can simply install the extension Live Sass Compiler, which will automatically translate found .scss files to .css after clicking on button _Watch Sass_ at the bottom panel in VS Code.
